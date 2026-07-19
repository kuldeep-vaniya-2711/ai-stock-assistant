from fastapi import APIRouter

from services.portfolio_chart_service import (
    get_portfolio_growth
)

router = APIRouter(
    prefix="/portfolio-chart",
    tags=["Portfolio Chart"]
)


@router.get("/{email}")
def chart(email: str):

    return get_portfolio_growth(email)