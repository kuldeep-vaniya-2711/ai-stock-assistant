from fastapi import APIRouter
from services.ai_recommendation_service import get_ai_recommendation

router = APIRouter(
    prefix="/ai",
    tags=["AI Recommendation"]
)


@router.get(
    "/recommendation/{email}",
    summary="AI Portfolio Recommendation"
)
def recommendation(email: str):

    return get_ai_recommendation(email)