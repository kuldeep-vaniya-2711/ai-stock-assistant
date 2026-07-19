from fastapi import APIRouter

from services.portfolio_summary_service import (
    get_portfolio_summary
)

router = APIRouter(
    prefix="/portfolio-summary",
    tags=["Portfolio Summary"]
)


@router.get("/{email}")
def summary(email: str):
    return get_portfolio_summary(email)