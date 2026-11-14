from enum import Enum


class Role(str, Enum):
    USER = "user"
    ADMIN = "admin"

ROLE_PERMISSIONS: dict[Role, frozenset[str]] = {
    Role.USER: frozenset({"read"}),
    Role.ADMIN: frozenset({"read", "write", "delete", "manage_users"}),
}