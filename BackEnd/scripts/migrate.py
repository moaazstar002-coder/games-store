from sqlalchemy import inspect, text
from sqlalchemy.engine import Engine


def migrate_schema(engine: Engine) -> None:
    inspector = inspect(engine)
    table_names = set(inspector.get_table_names())
    if "users" in table_names:
        user_columns = {
            column["name"] for column in inspector.get_columns("users")
        }
        if "role" not in user_columns:
            with engine.begin() as connection:
                connection.execute(
                    text(
                        "ALTER TABLE users ADD COLUMN role "
                        "VARCHAR(20) NOT NULL DEFAULT 'user'"
                    )
                )

    if "order_items" in table_names:
        _migrate_order_items(engine)


def _migrate_order_items(engine: Engine) -> None:
    columns = {
        column["name"]: column
        for column in inspect(engine).get_columns("order_items")
    }
    if (
        "console_id" in columns
        and "accessory_id" in columns
        and columns["game_id"]["nullable"]
    ):
        return

    if engine.dialect.name == "postgresql":
        with engine.begin() as connection:
            connection.execute(
                text(
                    "ALTER TABLE order_items "
                    "ADD COLUMN IF NOT EXISTS console_id INTEGER "
                    "REFERENCES consoles(id)"
                )
            )
            connection.execute(
                text(
                    "ALTER TABLE order_items "
                    "ADD COLUMN IF NOT EXISTS accessory_id INTEGER "
                    "REFERENCES accessories(id)"
                )
            )
            if not columns["game_id"]["nullable"]:
                connection.execute(
                    text(
                        "ALTER TABLE order_items "
                        "ALTER COLUMN game_id DROP NOT NULL"
                    )
                )
        return

    if engine.dialect.name != "sqlite":
        raise RuntimeError(
            f"Unsupported database for order item migration: {engine.dialect.name}"
        )

    expected_columns = {
        "id",
        "order_id",
        "game_id",
        "quantity",
        "price_at_purchase",
        "console_id",
        "accessory_id",
    }
    unexpected_columns = set(columns) - expected_columns
    if unexpected_columns:
        raise RuntimeError(
            "Cannot safely migrate order_items with unrecognized columns: "
            f"{sorted(unexpected_columns)}"
        )

    with engine.begin() as connection:
        temporary_table = connection.execute(
            text(
                "SELECT 1 FROM sqlite_master "
                "WHERE type = 'table' AND name = 'order_items_catalog_new'"
            )
        ).first()
        if temporary_table:
            raise RuntimeError(
                "Temporary order_items_catalog_new table exists; "
                "inspect it before retrying the migration."
            )

        connection.execute(
            text(
                "CREATE TABLE order_items_catalog_new ("
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
                "order_id INTEGER NOT NULL, "
                "game_id INTEGER, "
                "console_id INTEGER, "
                "accessory_id INTEGER, "
                "quantity INTEGER, "
                "price_at_purchase FLOAT NOT NULL, "
                "FOREIGN KEY(order_id) REFERENCES orders(id), "
                "FOREIGN KEY(game_id) REFERENCES games(id), "
                "FOREIGN KEY(console_id) REFERENCES consoles(id), "
                "FOREIGN KEY(accessory_id) REFERENCES accessories(id)"
                ")"
            )
        )
        source_columns = [
            "id",
            "order_id",
            "game_id",
            "quantity",
            "price_at_purchase",
        ]
        select_columns = [
            "console_id" if "console_id" in columns else "NULL",
            "accessory_id" if "accessory_id" in columns else "NULL",
        ]
        destination_columns = ", ".join(
            source_columns + ["console_id", "accessory_id"]
        )
        source_expressions = ", ".join(source_columns + select_columns)
        connection.execute(
            text(
                "INSERT INTO order_items_catalog_new "
                f"({destination_columns}) SELECT {source_expressions} "
                "FROM order_items"
            )
        )
        connection.execute(text("DROP TABLE order_items"))
        connection.execute(
            text(
                "ALTER TABLE order_items_catalog_new "
                "RENAME TO order_items"
            )
        )
        connection.execute(
            text("CREATE INDEX ix_order_items_id ON order_items (id)")
        )
