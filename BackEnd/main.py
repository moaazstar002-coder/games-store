import os
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, Path, Query, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from sqlalchemy import or_
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

import models

from database import SessionLocal, engine, get_db
from seeds import seed_database

# إنشاء الجداول تلقائياً
models.Base.metadata.create_all(bind=engine)
with SessionLocal() as db:
    seed_database(db)
    db.commit()

app = FastAPI(title="Game Store API")

frontend_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,"
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

def _serialize_category(category: models.Category) -> dict[str, int | str]:
    return {
        "id": category.id,
        "name": category.name,
        "slug": category.slug,
    }


def _serialize_game(game: models.Game) -> dict[str, object]:
    genres = [_serialize_category(game.category)]
    return {
        "id": game.id,
        "name": game.title,
        "title": game.title,
        "slug": game.slug,
        "description": game.description or "",
        "description_raw": game.description or "",
        "price": game.price,
        "rating": game.rating or 0,
        "background_image": game.image_url,
        "image_url": game.image_url,
        "is_featured": game.is_featured,
        "genres": genres,
        "category": genres[0],
        "short_screenshots": [],
        "platforms": [],
        "parent_platforms": [],
    }


def _paginated_response(
    count: int, results: list[dict[str, object]]
) -> dict[str, object]:
    return {
        "count": count,
        "next": None,
        "previous": None,
        "results": results,
    }


@app.get("/api/games")
def get_games(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=40),
    genre: str | None = Query(default=None, max_length=50),
    search: str | None = Query(default=None, max_length=100),
    ordering: str | None = Query(default=None, max_length=30),
):
    query = db.query(models.Game).join(models.Category)
    if genre:
        if genre.isdecimal():
            query = query.filter(models.Category.id == int(genre))
        else:
            query = query.filter(models.Category.slug == genre)
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                models.Game.title.ilike(search_term),
                models.Game.description.ilike(search_term),
            )
        )

    ordering_columns = {
        "name": models.Game.title,
        "-name": models.Game.title.desc(),
        "title": models.Game.title,
        "-title": models.Game.title.desc(),
        "rating": models.Game.rating,
        "-rating": models.Game.rating.desc(),
        "price": models.Game.price,
        "-price": models.Game.price.desc(),
        "-added": models.Game.id.desc(),
        "-featured": models.Game.is_featured.desc(),
    }
    selected_ordering = ordering or "-added"
    if selected_ordering not in ordering_columns:
        raise HTTPException(status_code=422, detail="ترتيب الألعاب غير صالح")
    query = query.order_by(
        ordering_columns[selected_ordering], models.Game.id.desc()
    )
    count = query.count()
    games = query.offset((page - 1) * page_size).limit(page_size).all()
    return _paginated_response(count, [_serialize_game(game) for game in games])


@app.get("/api/games/{game_id}")
def get_game_details(
    game_id: int = Path(..., gt=0), db: Session = Depends(get_db)
):
    game = db.query(models.Game).filter(models.Game.id == game_id).first()
    if game is None:
        raise HTTPException(status_code=404, detail="اللعبة غير موجودة")
    return _serialize_game(game)


@app.get("/api/games/{game_id}/movies")
def get_game_movies(
    game_id: int = Path(..., gt=0), db: Session = Depends(get_db)
):
    game_exists = db.query(models.Game.id).filter(models.Game.id == game_id).first()
    if game_exists is None:
        raise HTTPException(status_code=404, detail="اللعبة غير موجودة")
    return _paginated_response(0, [])


@app.get("/api/genres")
def get_genres(db: Session = Depends(get_db)):
    categories = db.query(models.Category).order_by(models.Category.name).all()
    return _paginated_response(
        len(categories), [_serialize_category(category) for category in categories]
    )

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