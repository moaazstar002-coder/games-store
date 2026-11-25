from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.modules.catalog.models import Accessory, Category, Console, Game
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


def _serialize_product(product: Console | Accessory, product_type: str) -> dict[str, object]:
    result: dict[str, object] = {
        "id": product.id,
        "product_id": product.id,
        "product_type": product_type,
        "name": product.title,
        "title": product.title,
        "slug": product.slug,
        "description": product.description,
        "price": product.price,
        "rating": product.rating or 0,
        "background_image": product.image_url,
        "image_url": product.image_url,
        "is_featured": product.is_featured,
    }
    if isinstance(product, Console):
        result.update(
            {
                "manufacturer": product.manufacturer,
                "platform": product.platform,
                "storage": product.storage,
                "is_handheld": product.is_handheld,
            }
        )
    else:
        result.update(
            {
                "brand": product.brand,
                "category": product.category,
                "compatibility": product.compatibility,
            }
        )
    return result


def _get_catalog_products(
    db: Session,
    model: type[Console] | type[Accessory],
    product_type: str,
    page: int,
    page_size: int,
    search: str | None,
    ordering: str | None,
    filter_field: str | None = None,
    filter_value: str | None = None,
) -> dict[str, object]:
    query = db.query(model)
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(model.title.ilike(search_term), model.description.ilike(search_term))
        )
    if filter_field and filter_value:
        query = query.filter(getattr(model, filter_field).ilike(filter_value.strip()))

    ordering_columns = {
        "name": model.title,
        "-name": model.title.desc(),
        "price": model.price,
        "-price": model.price.desc(),
        "rating": model.rating,
        "-rating": model.rating.desc(),
        "-added": model.id.desc(),
    }
    selected_ordering = ordering or "-added"
    if selected_ordering not in ordering_columns:
        raise HTTPException(status_code=422, detail="ترتيب المنتجات غير صالح")
    count = query.count()
    products = (
        query.order_by(ordering_columns[selected_ordering], model.id.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return paginated_response(
        count,
        [_serialize_product(product, product_type) for product in products],
    )


def _get_product_details(
    identifier: int | str,
    db: Session,
    model: type[Console] | type[Accessory],
    product_type: str,
) -> dict[str, object]:
    query = db.query(model)
    if str(identifier).isdecimal():
        product = query.filter(model.id == int(identifier)).first()
    else:
        product = query.filter(model.slug == identifier).first()
    if product is None:
        raise HTTPException(status_code=404, detail="المنتج غير موجود")
    return _serialize_product(product, product_type)


def get_consoles(
    db: Session,
    page: int,
    page_size: int,
    search: str | None = None,
    ordering: str | None = None,
    platform: str | None = None,
) -> dict[str, object]:
    return _get_catalog_products(
        db, Console, "console", page, page_size, search, ordering, "platform", platform
    )


def get_console_details(identifier: int | str, db: Session) -> dict[str, object]:
    return _get_product_details(identifier, db, Console, "console")


def get_accessories(
    db: Session,
    page: int,
    page_size: int,
    search: str | None = None,
    ordering: str | None = None,
    category: str | None = None,
) -> dict[str, object]:
    return _get_catalog_products(
        db,
        Accessory,
        "accessory",
        page,
        page_size,
        search,
        ordering,
        "category",
        category,
    )


def get_accessory_details(identifier: int | str, db: Session) -> dict[str, object]:
    return _get_product_details(identifier, db, Accessory, "accessory")


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
            status_code=409,    
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
