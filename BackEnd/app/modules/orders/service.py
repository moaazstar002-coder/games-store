import json
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.modules.catalog.models import Game
from app.modules.orders.models import Order, OrderItem
from app.modules.orders.schemas import OrderCreate
from app.modules.users.models import User


def create_order(
    order: OrderCreate, current_user: User | None, db: Session
) -> dict[str, object]:
    if not order.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="لا يمكن إنشاء طلب بدون عناصر",
        )

    # 1. Resolve ordering user (authenticated or guest account)
    target_user = current_user
    if target_user is None:
        email = (order.customer_email or "").strip().lower()
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="يجب تسجيل الدخول أو إدخال البريد الإلكتروني لإتمام الطلب",
            )
        target_user = db.query(User).filter(User.email == email).first()
        if target_user is None:
            name = (order.customer_name or "").strip() or email.split("@")[0]
            target_user = User(
                email=email,
                name=name,
                hashed_password=hash_password("guest_checkout_temporary"),
            )
            db.add(target_user)
            db.flush()

    # 2. Verify all games exist and fetch server prices
    game_ids = [item.game_id for item in order.items]
    games = db.query(Game).filter(Game.id.in_(game_ids)).all()
    game_map = {game.id: game for game in games}

    missing_games = [item.game_id for item in order.items if item.game_id not in game_map]
    if missing_games:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"الألعاب التالية غير موجودة في الكتالوج: {missing_games}",
        )

    # 3. Server-side total calculation based on DB prices
    total_amount = 0.0
    items_summary = []
    order_items_to_create = []

    for item in order.items:
        if item.quantity < 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"الكمية غير صالحة للعبة {item.game_id}",
            )
        game = game_map[item.game_id]
        item_total = round(game.price * item.quantity, 2)
        total_amount += item_total
        items_summary.append({
            "game_id": game.id,
            "title": game.title,
            "quantity": item.quantity,
            "price": game.price,
        })
        order_items_to_create.append({
            "game_id": game.id,
            "quantity": item.quantity,
            "price_at_purchase": game.price,
        })

    total_amount = round(total_amount, 2)

    # 4. Save Order
    new_order = Order(
        user_id=target_user.id,
        items=json.dumps(items_summary, ensure_ascii=False),
        total_amount=total_amount,
        status="pending",
    )
    db.add(new_order)
    db.flush()

    # 5. Populate OrderItem records
    for item_data in order_items_to_create:
        order_item = OrderItem(
            order_id=new_order.id,
            game_id=item_data["game_id"],
            quantity=item_data["quantity"],
            price_at_purchase=item_data["price_at_purchase"],
        )
        db.add(order_item)

    db.commit()
    db.refresh(new_order)

    return {
        "message": "تم إنشاء الطلب بنجاح",
        "order_id": new_order.id,
        "buyer": target_user.name,
        "total_amount": total_amount,
        "items_count": len(order_items_to_create),
        "status": new_order.status,
    }
