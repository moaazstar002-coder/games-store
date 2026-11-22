from pydantic import BaseModel, ConfigDict, Field, model_validator


class GameCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=100)
    slug: str = Field(min_length=1, max_length=100)
    description: str | None = None
    price: float = Field(ge=0)
    rating: float = Field(default=0, ge=0, le=5)
    image_url: str | None = Field(default=None, max_length=255)
    category_id: int = Field(gt=0)
    is_featured: bool = False


class GameUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str | None = Field(default=None, min_length=1, max_length=100)
    slug: str | None = Field(default=None, min_length=1, max_length=100)
    description: str | None = None
    price: float | None = Field(default=None, ge=0)
    rating: float | None = Field(default=None, ge=0, le=5)
    image_url: str | None = Field(default=None, max_length=255)
    category_id: int | None = Field(default=None, gt=0)
    is_featured: bool | None = None

    @model_validator(mode="after")
    def validate_changes(self):
        if not self.model_fields_set:
            raise ValueError("يجب إرسال حقل واحد على الأقل للتحديث")

        required_fields = {
            "title",
            "slug",
            "price",
            "rating",
            "category_id",
            "is_featured",
        }
        for field in required_fields & self.model_fields_set:
            if getattr(self, field) is None:
                raise ValueError(f"لا يمكن أن تكون قيمة {field} فارغة")
        return self
