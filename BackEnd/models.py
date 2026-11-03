from database import Base
from sqlalchemy import (
    Boolean,
    Column,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship


class User(Base):
  __tablename__ = "users"
  __table_args__ = {
      "extend_existing": True
  } 
  id = Column(Integer, primary_key=True, index=True)
  email = Column(String, unique=True, index=True, nullable=False)
  name = Column(String, nullable=False)
  hashed_password = Column(String, nullable=False)


class Order(Base):
  __tablename__ = "orders"
  __table_args__ = {"extend_existing": True} 

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  items = Column(String, nullable=False)
  total_amount = Column(Float, nullable=False)
  status = Column(String, default="pending")
  order_items = relationship("OrderItem", back_populates="order")


class Category(Base):
  __tablename__ = "categories"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  name = Column(String(50), unique=True, nullable=False)
  slug = Column(String(50), nullable=False)

  games = relationship("Game", back_populates="category")


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

  category = relationship("Category", back_populates="games")
  order_items = relationship("OrderItem", back_populates="game")


class OrderItem(Base):
  __tablename__ = "order_items"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
  game_id = Column(Integer, ForeignKey("games.id"), nullable=False)
  quantity = Column(Integer, default=1)
  price_at_purchase = Column(Float, nullable=False)

  order = relationship("Order", back_populates="order_items")
  game = relationship("Game", back_populates="order_items")