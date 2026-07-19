from fastapi import APIRouter

from services.portfolio_performance_service import (
    get_portfolio_performance
)

router = APIRouter(
    prefix="/portfolio-performance",
    tags=["Portfolio Performance"]
)


@router.get("/{email}")
def performance(email: str):

    return get_portfolio_performance(email)