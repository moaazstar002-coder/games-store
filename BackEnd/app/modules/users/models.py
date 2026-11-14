from sqlalchemy import Column, Enum as SQLEnum, Integer, String

from app.core.roles import Role
from app.db.base import Base


class User(Base):
    __tablename__ = "users"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(
        SQLEnum(
            Role,
            native_enum=False,
            length=20,
            values_callable=lambda roles: [role.value for role in roles],
        ),
        default=Role.USER,
        nullable=False,
        server_default=Role.USER.value,
    )