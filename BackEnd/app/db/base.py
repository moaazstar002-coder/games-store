from sqlalchemy.orm import declarative_base

Base = declarative_base()

from app.modules.catalog import models as catalog_models
from app.modules.orders import models as order_models
from app.modules.users import models as user_models
