from pydantic import BaseModel


class OrderCreate(BaseModel):
    items: str
    total_amount: float
    payment_method: str = "Credit Card"
    notes: str | None = None
