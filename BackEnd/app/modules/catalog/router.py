from fastapi import APIRouter, Depends, Path, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_permission
from app.db.session import get_db
from app.modules.catalog import service
from app.modules.catalog.schemas import (
    CatalogProductPage,
    CatalogProductRead,
    GameCreate,
    GameUpdate,
)

router = APIRouter(tags=["catalog"])


@router.post(
    "/games",
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_permission("write"))],
)
def create_game(game: GameCreate, db: Session = Depends(get_db)):
    return service.create_game(game, db)


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


@router.patch(
    "/games/{game_id}",
    dependencies=[Depends(require_permission("write"))],
)
def update_game(
    game: GameUpdate,
    game_id: int = Path(..., gt=0),
    db: Session = Depends(get_db),
):
    return service.update_game(game_id, game, db)


@router.delete(
    "/games/{game_id}",
    dependencies=[Depends(require_permission("delete"))],
)
def delete_game(game_id: int = Path(..., gt=0), db: Session = Depends(get_db)):
    return service.delete_game(game_id, db)


@router.get("/games/{game_id}/movies")
def get_game_movies(
    game_id: int = Path(..., gt=0), db: Session = Depends(get_db)
):
    return service.get_game_movies(game_id, db)


@router.get("/genres")
def get_genres(db: Session = Depends(get_db)):
    return service.get_genres(db)


@router.get("/consoles", response_model=CatalogProductPage)
def get_consoles(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=40),
    search: str | None = Query(default=None, max_length=100),
    ordering: str | None = Query(default=None, max_length=30),
    platform: str | None = Query(default=None, max_length=50),
):
    return service.get_consoles(db, page, page_size, search, ordering, platform)


@router.get("/consoles/{identifier}", response_model=CatalogProductRead)
def get_console_details(
    identifier: str = Path(..., min_length=1, max_length=100),
    db: Session = Depends(get_db),
):
    return service.get_console_details(identifier, db)


@router.get("/accessories", response_model=CatalogProductPage)
def get_accessories(
    db: Session = Depends(get_db),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=40),
    search: str | None = Query(default=None, max_length=100),
    ordering: str | None = Query(default=None, max_length=30),
    category: str | None = Query(default=None, max_length=50),
):
    return service.get_accessories(db, page, page_size, search, ordering, category)


@router.get("/accessories/{identifier}", response_model=CatalogProductRead)
def get_accessory_details(
    identifier: str = Path(..., min_length=1, max_length=100),
    db: Session = Depends(get_db),
):
    return service.get_accessory_details(identifier, db)
