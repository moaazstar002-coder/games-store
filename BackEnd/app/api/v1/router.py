from fastapi import APIRouter

from app.modules.auth.router import router as auth_router
from app.modules.catalog.router import router as catalog_router
from app.modules.orders.router import router as orders_router

router = APIRouter(prefix="/api/v1")
router.include_router(auth_router)
router.include_router(catalog_router)
router.include_router(orders_router)
