import json
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.modules.catalog.models import Accessory, Console, Game
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

    # 2. Resolve products from the catalog and use database prices.
    product_models = {
        "game": Game,
        "console": Console,
        "accessory": Accessory,
    }
    product_map: dict[tuple[str, int], Game | Console | Accessory] = {}
    product_ids_by_type: dict[str, set[int]] = {}
    for item in order.items:
        product_ids_by_type.setdefault(item.product_type, set()).add(item.product_id)
    for product_type, product_ids in product_ids_by_type.items():
        model = product_models[product_type]
        products = db.query(model).filter(model.id.in_(product_ids)).all()
        product_map.update(
            {(product_type, product.id): product for product in products}
        )

    missing_products = [
        {"type": item.product_type, "id": item.product_id}
        for item in order.items
        if (item.product_type, item.product_id) not in product_map
    ]
    if missing_products:
        missing_games = [
            item["id"] for item in missing_products if item["type"] == "game"
        ]
        if len(missing_games) == len(missing_products):
            detail = f"الألعاب التالية غير موجودة في الكتالوج: {missing_games}"
        else:
            detail = f"المنتجات التالية غير موجودة في الكتالوج: {missing_products}"
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
        )

    # 3. Server-side total calculation based on DB prices
    total_amount = 0.0
    items_summary = []
    order_items_to_create = []

    for item in order.items:
        product = product_map[(item.product_type, item.product_id)]
        item_total = round(product.price * item.quantity, 2)
        total_amount += item_total
        item_summary = {
            "product_type": item.product_type,
            "product_id": product.id,
            "title": product.title,
            "quantity": item.quantity,
            "price": product.price,
        }
        if item.product_type == "game":
            item_summary["game_id"] = product.id
        items_summary.append(item_summary)
        order_items_to_create.append(
            {
                "game_id": product.id if item.product_type == "game" else None,
                "console_id": product.id if item.product_type == "console" else None,
                "accessory_id": product.id if item.product_type == "accessory" else None,
                "quantity": item.quantity,
                "price_at_purchase": product.price,
            }
        )

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
            console_id=item_data["console_id"],
            accessory_id=item_data["accessory_id"],
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
