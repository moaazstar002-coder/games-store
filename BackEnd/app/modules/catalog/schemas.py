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


class ConsoleCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=100)
    slug: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1)
    price: float = Field(ge=0)
    rating: float = Field(default=0, ge=0, le=5)
    image_url: str = Field(min_length=1, max_length=500)
    manufacturer: str = Field(min_length=1, max_length=80)
    platform: str = Field(min_length=1, max_length=50)
    storage: str | None = Field(default=None, max_length=50)
    is_handheld: bool = False
    is_featured: bool = False


class ConsoleUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str | None = Field(default=None, min_length=1, max_length=100)
    slug: str | None = Field(default=None, min_length=1, max_length=100)
    description: str | None = Field(default=None, min_length=1)
    price: float | None = Field(default=None, ge=0)
    rating: float | None = Field(default=None, ge=0, le=5)
    image_url: str | None = Field(default=None, min_length=1, max_length=500)
    manufacturer: str | None = Field(default=None, min_length=1, max_length=80)
    platform: str | None = Field(default=None, min_length=1, max_length=50)
    storage: str | None = Field(default=None, max_length=50)
    is_handheld: bool | None = None
    is_featured: bool | None = None

    @model_validator(mode="after")
    def validate_changes(self):
        if not self.model_fields_set:
            raise ValueError("يجب إرسال حقل واحد على الأقل للتحديث")
        for field in self.model_fields_set:
            if field != "storage" and getattr(self, field) is None:
                raise ValueError(f"لا يمكن أن تكون قيمة {field} فارغة")
        return self


class AccessoryCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=100)
    slug: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1)
    price: float = Field(ge=0)
    rating: float = Field(default=0, ge=0, le=5)
    image_url: str = Field(min_length=1, max_length=500)
    brand: str = Field(min_length=1, max_length=80)
    category: str = Field(min_length=1, max_length=50)
    compatibility: str = Field(min_length=1, max_length=160)
    is_featured: bool = False


class AccessoryUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str | None = Field(default=None, min_length=1, max_length=100)
    slug: str | None = Field(default=None, min_length=1, max_length=100)
    description: str | None = Field(default=None, min_length=1)
    price: float | None = Field(default=None, ge=0)
    rating: float | None = Field(default=None, ge=0, le=5)
    image_url: str | None = Field(default=None, min_length=1, max_length=500)
    brand: str | None = Field(default=None, min_length=1, max_length=80)
    category: str | None = Field(default=None, min_length=1, max_length=50)
    compatibility: str | None = Field(default=None, min_length=1, max_length=160)
    is_featured: bool | None = None

    @model_validator(mode="after")
    def validate_changes(self):
        if not self.model_fields_set:
            raise ValueError("يجب إرسال حقل واحد على الأقل للتحديث")
        for field in self.model_fields_set:
            if getattr(self, field) is None:
                raise ValueError(f"لا يمكن أن تكون قيمة {field} فارغة")
        return self


class CatalogProductRead(BaseModel):
    id: int
    product_type: str
    title: str
    name: str
    slug: str
    description: str
    price: float
    rating: float
    image_url: str
    background_image: str
    is_featured: bool
    manufacturer: str | None = None
    platform: str | None = None
    storage: str | None = None
    is_handheld: bool | None = None
    brand: str | None = None
    category: str | None = None
    compatibility: str | None = None


class CatalogProductPage(BaseModel):
    count: int
    next: str | None = None
    previous: str | None = None
    results: list[CatalogProductRead]
