from database import Base
from sqlalchemy import Column, Float, ForeignKey, Integer, String


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