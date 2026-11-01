from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

import models

from database import engine, get_db
# إنشاء الجداول تلقائياً
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Game Store API")

# --- إعدادات الأمان والتشفير ---
SECRET_KEY = "SUPER_SECRET_KEY_HERE_CHANGE_IT"  # مفتاح سري لتوقيع التذكرة (JWT)
ALGORITHM = "HS256"  # نوع خوارزمية التشفير
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # مدة صلاحية التذكرة (30 دقيقة)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


# دوال مساعدة للتشفير
def hash_password(password: str) -> str:
  return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict):
  """في الكواليس: تأخذ بيانات المستخدم، تضيف لها وقت انتهاء الصلاحية، وتوقعها بالمفتاح السري لتصبح 'تذكرة' JWT"""
  to_encode = data.copy()
  expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp": expire})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# --- النماذج (Pydantic Models) ---
class UserCreate(BaseModel):
  name: str
  email: EmailStr
  password: str


class UserLogin(BaseModel):
  email: EmailStr
  password: str


class OrderCreate(BaseModel):
  items: str
  total_amount: float
  payment_method: str = "Credit Card"
  notes: str | None = None


# --- دالة التحقق من المستخدم الحالي عبر الـ Token (تحدث في الكواليس) ---
def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
  """هذه الدالة تفحص التذكرة القادمة مع الطلب، تفك شفرتها، وتتأكد من هوية المستخدم"""
  credentials_exception = HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="انتهت صلاحية الجلسة أو يجب تسجيل الدخول أولاً",
      headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    email: str = payload.get("sub")
    if email is None:
      raise credentials_exception
  except JWTError:
    raise credentials_exception

  user = db.query(models.User).filter(models.User.email == email).first()
  if user is None:
    raise credentials_exception
  return user  # ترجع كائن المستخدم بالكامل إذا كانت التذكرة صحيحة


# --- مسارات المصادقة (Auth Endpoints) ---


@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
  db_user = db.query(models.User).filter(models.User.email == user.email).first()
  if db_user:
    raise HTTPException(status_code=400, detail="البريد الإلكتروني مسجل بالفعل")

  hashed_pwd = hash_password(user.password)
  new_user = models.User(
      email=user.email, name=user.name, hashed_password=hashed_pwd
  )

  db.add(new_user)
  db.commit()
  db.refresh(new_user)
  return {"message": "تم إنشاء الحساب بنجاح", "user_id": new_user.id}


@app.post("/api/auth/login")
def login_user(user_credentials: UserLogin, db: Session = Depends(get_db)):
  """عند تسجيل الدخول بنجاح، نصنع له 'تذكرة' JWT ونرسلها له"""
  user = (
      db.query(models.User)
      .filter(models.User.email == user_credentials.email)
      .first()
  )
  if not user or not verify_password(
      user_credentials.password, user.hashed_password
  ):
    raise HTTPException(status_code=400, detail="بيانات الدخول غير صحيحة")

  # إنشاء تذكرة الـ Token وبداخلها الإيميل كمعرّف (sub)
  access_token = create_access_token(data={"sub": user.email})

  return {
      "access_token": access_token,
      "token_type": "bearer",
      "user_name": user.name,
  }


# --- مسارات الطلبات (Order Endpoints الاحترافية) ---


@app.post("/api/orders", status_code=status.HTTP_201_CREATED)
def create_order(
    order: OrderCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
  new_order = models.Order(
      user_id=current_user.id,  # نأخذ الـ ID من المستخدم الحالي المتحقق منه
      items=order.items,
      total_amount=order.total_amount,
      status="pending",
  )

  db.add(new_order)
  db.commit()
  db.refresh(new_order)

  return {
      "message": "تم إنشاء الطلب بنجاح",
      "order_id": new_order.id,
      "buyer": current_user.name,
  }