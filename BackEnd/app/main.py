from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.v1.router import router
from app.core.config import APP_TITLE, FRONTEND_ORIGINS
from app.db.base import Base
from app.db.session import SessionLocal, engine
from scripts.seed import seed_database

Base.metadata.create_all(bind=engine)
with SessionLocal() as db:
    seed_database(db)
    db.commit()

app = FastAPI(title=APP_TITLE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
app.include_router(router)
