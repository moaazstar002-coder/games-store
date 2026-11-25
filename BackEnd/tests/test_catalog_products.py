import unittest

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

from app.db.base import Base
from app.modules.catalog.models import Accessory, Console
from app.modules.catalog.service import (
    get_accessories,
    get_accessory_details,
    get_consoles,
    get_console_details,
)
from app.modules.orders.models import OrderItem
from app.modules.orders.schemas import OrderCreate, OrderItemCreate
from app.modules.orders.service import create_order
from app.modules.users.models import User
from scripts.seed import seed_database


class TestConsoleAndAccessoryCatalog(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        Base.metadata.create_all(bind=self.engine)
        self.session_factory = sessionmaker(bind=self.engine)
        self.db = self.session_factory()
        self.user = User(
            email="catalog@example.com",
            name="Catalog User",
            hashed_password="hashed_password",
        )
        self.db.add(self.user)
        self.db.commit()

    def tearDown(self):
        self.db.close()
        self.engine.dispose()

    def test_seed_adds_catalog_products_once(self):
        first = seed_database(self.db)
        second = seed_database(self.db)

        self.assertGreater(first["consoles_added"], 0)
        self.assertGreater(first["accessories_added"], 0)
        self.assertEqual(second["consoles_added"], 0)
        self.assertEqual(second["accessories_added"], 0)
        self.assertEqual(self.db.query(Console).count(), first["consoles_added"])
        self.assertEqual(
            self.db.query(Accessory).count(), first["accessories_added"]
        )

    def test_console_listing_supports_search_pagination_and_slug_lookup(self):
        seed_database(self.db)
        result = get_consoles(self.db, page=1, page_size=2, search="switch")
        filtered = get_consoles(
            self.db, page=1, page_size=20, platform="Nintendo"
        )

        self.assertGreaterEqual(result["count"], 1)
        self.assertEqual(len(result["results"]), 1)
        self.assertTrue(filtered["results"])
        self.assertTrue(
            all(item["platform"] == "Nintendo" for item in filtered["results"])
        )
        product = result["results"][0]
        self.assertEqual(product["product_type"], "console")
        self.assertEqual(get_console_details(product["slug"], self.db)["id"], product["id"])

    def test_accessory_listing_supports_search_and_slug_lookup(self):
        seed_database(self.db)
        result = get_accessories(self.db, page=1, page_size=20, search="headset")
        filtered = get_accessories(
            self.db, page=1, page_size=20, category="Headsets"
        )

        self.assertGreaterEqual(result["count"], 1)
        self.assertTrue(filtered["results"])
        self.assertTrue(
            all(item["category"] == "Headsets" for item in filtered["results"])
        )
        product = result["results"][0]
        self.assertEqual(product["product_type"], "accessory")
        self.assertEqual(
            get_accessory_details(product["slug"], self.db)["id"], product["id"]
        )

    def test_missing_console_returns_not_found(self):
        from fastapi import HTTPException

        with self.assertRaises(HTTPException) as context:
            get_console_details("missing-console", self.db)

        self.assertEqual(context.exception.status_code, 404)

    def test_order_can_contain_console_and_accessory_items(self):
        seed_database(self.db)
        console = self.db.query(Console).first()
        accessory = self.db.query(Accessory).first()
        order = OrderCreate(
            items=[
                OrderItemCreate(
                    product_type="console", product_id=console.id, quantity=1
                ),
                OrderItemCreate(
                    product_type="accessory", product_id=accessory.id, quantity=2
                ),
            ],
            customer_email=self.user.email,
        )

        result = create_order(order, self.user, self.db)

        self.assertEqual(
            result["total_amount"], round(console.price + accessory.price * 2, 2)
        )
        order_items = self.db.query(OrderItem).filter(
            OrderItem.order_id == result["order_id"]
        ).all()
        self.assertEqual(len(order_items), 2)
        self.assertEqual(
            {(item.console_id, item.accessory_id) for item in order_items},
            {(console.id, None), (None, accessory.id)},
        )

    def test_schema_migration_adds_optional_product_foreign_keys(self):
        legacy_engine = create_engine("sqlite:///:memory:")
        with legacy_engine.begin() as connection:
            connection.execute(
                text(
                    "CREATE TABLE order_items ("
                    "id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL, "
                    "game_id INTEGER NOT NULL, quantity INTEGER, "
                    "price_at_purchase FLOAT NOT NULL)"
                )
            )
            connection.execute(
                text(
                    "INSERT INTO order_items "
                    "(id, order_id, game_id, quantity, price_at_purchase) "
                    "VALUES (1, 7, 9, 2, 12.5)"
                )
            )

        from scripts.migrate import migrate_schema

        migrate_schema(legacy_engine)
        migrate_schema(legacy_engine)

        columns = {
            column["name"]: column
            for column in inspect(legacy_engine).get_columns("order_items")
        }
        self.assertIn("console_id", columns)
        self.assertIn("accessory_id", columns)
        self.assertTrue(columns["game_id"]["nullable"])
        with legacy_engine.connect() as connection:
            legacy_game_id = connection.execute(
                text("SELECT game_id FROM order_items WHERE id = 1")
            ).scalar_one()
        self.assertEqual(legacy_game_id, 9)
        legacy_engine.dispose()


if __name__ == "__main__":
    unittest.main()
