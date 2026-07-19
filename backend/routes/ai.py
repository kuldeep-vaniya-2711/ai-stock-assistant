from fastapi import APIRouter

from services.ai_service import get_ai_portfolio_advice

router = APIRouter()


@router.get("/ai-advice/{email}")
def ai_advice(email: str):

    return get_ai_portfolio_advice(email)