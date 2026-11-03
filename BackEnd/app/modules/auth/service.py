from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.modules.auth.schemas import UserCreate, UserLogin
from app.modules.users.models import User


def register_user(user: UserCreate, db: Session) -> dict[str, int | str]:
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail="البريد الإلكتروني مسجل بالفعل"
        )

    new_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "تم إنشاء الحساب بنجاح", "user_id": new_user.id}


def login_user(user_credentials: UserLogin, db: Session) -> dict[str, str]:
    user = db.query(User).filter(User.email == user_credentials.email).first()
    if not user or not verify_password(
        user_credentials.password, user.hashed_password
    ):
        raise HTTPException(status_code=400, detail="بيانات الدخول غير صحيحة")

    access_token = create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_name": user.name,
    }
