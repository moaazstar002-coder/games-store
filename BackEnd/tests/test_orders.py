import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException

from app.db.base import Base
from app.modules.catalog.models import Category, Game
from app.modules.orders.models import Order, OrderItem
from app.modules.orders.schemas import OrderCreate, OrderItemCreate
from app.modules.orders.service import create_order
from app.modules.users.models import User


class TestOrderService(unittest.TestCase):
    def setUp(self):
        # Create an in-memory SQLite engine for isolated testing
        self.engine = create_engine("sqlite:///:memory:")
        TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        Base.metadata.create_all(bind=self.engine)
        self.db = TestingSessionLocal()

        # Seed categories and sample games
        category = Category(name="Action", slug="action")
        self.db.add(category)
        self.db.flush()

        self.game1 = Game(
            title="God of War",
            slug="god-of-war",
            price=39.99,
            category_id=category.id,
        )
        self.game2 = Game(
            title="Elden Ring",
            slug="elden-ring",
            price=59.99,
            category_id=category.id,
        )
        self.db.add_all([self.game1, self.game2])

        # Seed a test user
        self.user = User(
            email="gamer@example.com",
            name="Gamer User",
            hashed_password="hashed_pw_test",
        )
        self.db.add(self.user)
        self.db.commit()

    def tearDown(self):
        self.db.close()
        Base.metadata.drop_all(bind=self.engine)

    def test_create_order_calculates_total_server_side(self):
        # Request with 2 units of game1 and 1 unit of game2
        order_in = OrderCreate(
            items=[
                OrderItemCreate(game_id=self.game1.id, quantity=2),
                OrderItemCreate(game_id=self.game2.id, quantity=1),
            ],
            customer_email="gamer@example.com",
        )

        result = create_order(order_in, self.user, self.db)

        # Expected total: 39.99 * 2 + 59.99 = 139.97
        expected_total = 139.97
        self.assertEqual(result["total_amount"], expected_total)
        self.assertEqual(result["items_count"], 2)

        # Verify Order record in database
        order = self.db.query(Order).filter(Order.id == result["order_id"]).first()
        self.assertIsNotNone(order)
        self.assertEqual(order.total_amount, expected_total)
        self.assertEqual(order.user_id, self.user.id)

        # Verify OrderItem records in database
        order_items = self.db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        self.assertEqual(len(order_items), 2)

        items_map = {item.game_id: item for item in order_items}
        self.assertEqual(items_map[self.game1.id].quantity, 2)
        self.assertEqual(items_map[self.game1.id].price_at_purchase, 39.99)
        self.assertEqual(items_map[self.game2.id].quantity, 1)
        self.assertEqual(items_map[self.game2.id].price_at_purchase, 59.99)

    def test_create_order_rejects_empty_items(self):
        from pydantic import ValidationError
        with self.assertRaises(ValidationError):
            OrderCreate(
                items=[],
                customer_email="gamer@example.com",
            )

    def test_create_order_rejects_nonexistent_game(self):
        order_in = OrderCreate(
            items=[OrderItemCreate(game_id=99999, quantity=1)],
            customer_email="gamer@example.com",
        )
        with self.assertRaises(HTTPException) as ctx:
            create_order(order_in, self.user, self.db)
        self.assertEqual(ctx.exception.status_code, 404)

    def test_create_order_creates_guest_user_if_not_authenticated(self):
        order_in = OrderCreate(
            items=[OrderItemCreate(game_id=self.game1.id, quantity=1)],
            customer_name="Guest Player",
            customer_email="guest@example.com",
        )

        result = create_order(order_in, current_user=None, db=self.db)
        self.assertEqual(result["total_amount"], 39.99)

        # Guest user should have been created
        guest_user = self.db.query(User).filter(User.email == "guest@example.com").first()
        self.assertIsNotNone(guest_user)
        self.assertEqual(guest_user.name, "Guest Player")


if __name__ == "__main__":
    unittest.main()
