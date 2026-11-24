from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.modules.catalog.models import Category, Game
from app.modules.catalog.schemas import GameCreate, GameUpdate


def serialize_category(category: Category) -> dict[str, int | str]:
    return {
        "id": category.id,
        "name": category.name,
        "slug": category.slug,
    }


def serialize_game(game: Game) -> dict[str, object]:
    genres = [serialize_category(game.category)]
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


def paginated_response(
    count: int, results: list[dict[str, object]]
) -> dict[str, object]:
    return {
        "count": count,
        "next": None,
        "previous": None,
        "results": results,
    }


def get_games(
    db: Session,
    page: int,
    page_size: int,
    genre: str | None,
    search: str | None,
    ordering: str | None,
) -> dict[str, object]:
    query = db.query(Game).join(Category)
    if genre:
        if genre.isdecimal():
            query = query.filter(Category.id == int(genre))
        else:
            query = query.filter(Category.slug == genre)
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(Game.title.ilike(search_term), Game.description.ilike(search_term))
        )

    ordering_columns = {
        "name": Game.title,
        "-name": Game.title.desc(),
        "title": Game.title,
        "-title": Game.title.desc(),
        "rating": Game.rating,
        "-rating": Game.rating.desc(),
        "price": Game.price,
        "-price": Game.price.desc(),
        "-added": Game.id.desc(),
        "-featured": Game.is_featured.desc(),
    }
    selected_ordering = ordering or "-added"
    if selected_ordering not in ordering_columns:
        raise HTTPException(status_code=422, detail="ترتيب الألعاب غير صالح")
    query = query.order_by(ordering_columns[selected_ordering], Game.id.desc())
    count = query.count()
    games = query.offset((page - 1) * page_size).limit(page_size).all()
    return paginated_response(count, [serialize_game(game) for game in games])


def get_game_details(game_id: int, db: Session) -> dict[str, object]:
    game = db.query(Game).filter(Game.id == game_id).first()
    if game is None:
        raise HTTPException(status_code=404, detail="اللعبة غير موجودة")
    return serialize_game(game)


def create_game(game_data: GameCreate, db: Session) -> dict[str, object]:
    if db.query(Game.id).filter(Game.slug == game_data.slug).first():
        raise HTTPException(status_code=409, detail="معرّف اللعبة مستخدم بالفعل")
    category = db.query(Category).filter(Category.id == game_data.category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="التصنيف غير موجود")

    game = Game(**game_data.model_dump(), category=category)
    db.add(game)
    db.commit()
    db.refresh(game)
    return serialize_game(game)


def update_game(
    game_id: int, changes: GameUpdate, db: Session
) -> dict[str, object]:
    game = db.query(Game).filter(Game.id == game_id).first()
    if game is None:
        raise HTTPException(status_code=404, detail="اللعبة غير موجودة")

    update_data = changes.model_dump(exclude_unset=True)
    if "slug" in update_data and db.query(Game.id).filter(
        Game.slug == update_data["slug"], Game.id != game_id
    ).first():
        raise HTTPException(status_code=409, detail="معرّف اللعبة مستخدم بالفعل")

    if "category_id" in update_data:
        category = (
            db.query(Category)
            .filter(Category.id == update_data["category_id"])
            .first()
        )
        if category is None:
            raise HTTPException(status_code=404, detail="التصنيف غير موجود")
        game.category = category
        del update_data["category_id"]

    for field, value in update_data.items():
        setattr(game, field, value)
    db.commit()
    db.refresh(game)
    return serialize_game(game)


def delete_game(game_id: int, db: Session) -> dict[str, str]:
    game = db.query(Game).filter(Game.id == game_id).first()
    if game is None:
        raise HTTPException(status_code=404, detail="اللعبة غير موجودة")
    if game.order_items:
        raise HTTPException(
            status_code=409,zz
            detail="لا يمكن حذف لعبة مرتبطة بطلبات سابقة",
        )

    db.delete(game)
    db.commit()
    return {"message": "تم حذف اللعبة بنجاح"}


def get_game_movies(game_id: int, db: Session) -> dict[str, object]:
    game_exists = db.query(Game.id).filter(Game.id == game_id).first()
    if game_exists is None:
        raise HTTPException(status_code=404, detail="اللعبة غير موجودة")
    return paginated_response(0, [])


def get_genres(db: Session) -> dict[str, object]:
    categories = db.query(Category).order_by(Category.name).all()
    return paginated_response(
        len(categories), [serialize_category(category) for category in categories]
    )
