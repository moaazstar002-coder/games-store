import os
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[2]
DEFAULT_DATABASE_PATH = BACKEND_DIR / "sql_app.db"

DATABASE_URL = os.getenv(
    "DATABASE_URL", f"sqlite:///{DEFAULT_DATABASE_PATH.as_posix()}"
)
SECRET_KEY = os.getenv("SECRET_KEY", "SUPER_SECRET_KEY_HERE_CHANGE_IT")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
APP_TITLE = "Game Store API"

FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,"
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]
