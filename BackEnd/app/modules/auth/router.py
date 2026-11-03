from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.auth.schemas import UserCreate, UserLogin
from app.modules.auth.service import login_user as authenticate_user
from app.modules.auth.service import register_user as create_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(user, db)


@router.post("/login")
def login_user(user_credentials: UserLogin, db: Session = Depends(get_db)):
    return authenticate_user(user_credentials, db)
