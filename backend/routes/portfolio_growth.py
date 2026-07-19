from fastapi import APIRouter

from services.portfolio_growth_service import (
    get_growth_data
)

router = APIRouter(
    prefix="/portfolio-growth",
    tags=["Portfolio Growth"]
)


@router.get("/{email}")
def portfolio_growth(email: str):

    return get_growth_data(email)