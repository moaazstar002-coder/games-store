from fastapi import APIRouter, Depends, Path, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.catalog import service

router = APIRouter(tags=["catalog"])


@router.get("/games")
def get_games(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=40),
    genre: str | None = Query(default=None, max_length=50),
    search: str | None = Query(default=None, max_length=100),
    ordering: str | None = Query(default=None, max_length=30),
):
    return service.get_games(db, page, page_size, genre, search, ordering)


@router.get("/games/{game_id}")
def get_game_details(
    game_id: int = Path(..., gt=0), db: Session = Depends(get_db)
):
    return service.get_game_details(game_id, db)


@router.get("/games/{game_id}/movies")
def get_game_movies(
    game_id: int = Path(..., gt=0), db: Session = Depends(get_db)
):
    return service.get_game_movies(game_id, db)


@router.get("/genres")
def get_genres(db: Session = Depends(get_db)):
    return service.get_genres(db)
