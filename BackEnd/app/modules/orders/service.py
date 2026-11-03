from sqlalchemy.orm import Session

from app.modules.orders.models import Order
from app.modules.orders.schemas import OrderCreate
from app.modules.users.models import User


def create_order(order: OrderCreate, current_user: User, db: Session) -> dict[str, int | str]:
    new_order = Order(
        user_id=current_user.id,
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
