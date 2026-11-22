import argparse
import sys

from app.core.roles import Role
from app.db.session import SessionLocal
from app.modules.users.models import User


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Set a user's role using the configured database."
    )
    parser.add_argument("email", help="Email address of the existing user")
    parser.add_argument("role", choices=[role.value for role in Role])
    args = parser.parse_args()

    with SessionLocal() as db:
        user = db.query(User).filter(User.email == args.email).first()
        if user is None:
            print(f"No user found with email {args.email}", file=sys.stderr)
            return 1
        user.role = Role(args.role)
        db.commit()
        print(f"Set {user.email} role to {user.role.value}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
