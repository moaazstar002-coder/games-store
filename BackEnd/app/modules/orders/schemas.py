from typing import Literal

from pydantic import BaseModel, Field, model_validator


class OrderItemCreate(BaseModel):
    product_type: Literal["game", "console", "accessory"] = "game"
    product_id: int | None = Field(default=None, gt=0)
    game_id: int | None = Field(default=None, gt=0, description="معرف اللعبة")
    quantity: int = Field(default=1, ge=1, description="الكمية المطلوبة")

    @model_validator(mode="after")
    def validate_product(self):
        if self.product_id is None:
            if self.product_type != "game" or self.game_id is None:
                raise ValueError("يجب تحديد معرّف المنتج ونوعه")
            self.product_id = self.game_id
        elif self.game_id is not None and (
            self.product_type != "game" or self.game_id != self.product_id
        ):
            raise ValueError("معرّف اللعبة لا يتوافق مع بيانات المنتج")
        return self


class OrderCreate(BaseModel):
    items: list[OrderItemCreate] = Field(..., min_length=1, description="قائمة عناصر الطلب")
    customer_name: str | None = Field(default=None, max_length=100)
    customer_email: str | None = Field(default=None, max_length=120)
    payment_method: str = Field(default="Credit Card", max_length=50)
    notes: str | None = Field(default=None, max_length=500)
