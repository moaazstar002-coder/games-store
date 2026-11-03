from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.base import Base


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
