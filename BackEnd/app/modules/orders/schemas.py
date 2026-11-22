from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):
    game_id: int = Field(..., gt=0, description="معرف اللعبة")
    quantity: int = Field(default=1, ge=1, description="الكمية المطلوبة")


class OrderCreate(BaseModel):
    items: list[OrderItemCreate] = Field(..., min_length=1, description="قائمة عناصر الطلب")
    customer_name: str | None = Field(default=None, max_length=100)
    customer_email: str | None = Field(default=None, max_length=120)
    payment_method: str = Field(default="Credit Card", max_length=50)
    notes: str | None = Field(default=None, max_length=500)
