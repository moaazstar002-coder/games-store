# models.py
from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# 1. جدول المستخدمين
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="customer") # customer or admin
    created_at = Column(DateTime, default=datetime.utcnow)

    # علاقة One-to-Many مع الطلبات
    orders = relationship("Order", back_populates="user")


# 2. جدول التصنيفات
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    slug = Column(String(50), nullable=False)

    # علاقة One-to-Many مع الألعاب
    games = relationship("Game", back_populates="category")


# 3. جدول الألعاب
class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    slug = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    rating = Column(Float, default=0.0)
    image_url = Column(String(255))
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    is_featured = Column(Boolean, default=False)

    # العلاقات
    category = relationship("Category", back_populates="games")
    order_items = relationship("OrderItem", back_populates="game")


# 4. جدول الطلبات (الفواتير)
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String(20), default="pending") # pending, completed, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)

    # العلاقات
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")


# 5. الجدول الوسيط (عناصر الطلب لعلاقة Many-to-Many)
class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    game_id = Column(Integer, ForeignKey("games.id"), nullable=False)
    quantity = Column(Integer, default=1)
    price_at_purchase = Column(Float, nullable=False)

    # العلاقات
    order = relationship("Order", back_populates="items")
    game = relationship("Game", back_populates="order_items")