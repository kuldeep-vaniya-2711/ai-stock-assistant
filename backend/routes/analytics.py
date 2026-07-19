from fastapi import APIRouter
from services.analytics_service import get_ai_insights

router = APIRouter(
    prefix="",
    tags=["Analytics"]
)


@router.get("/analytics/{email}")
def analytics(email: str):

    return get_ai_insights(email)