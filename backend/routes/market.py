from fastapi import APIRouter

from services.market_service import get_top_gainers

router = APIRouter(
    prefix="/market",
    tags=["Market"]
)


@router.get("/top-gainers")
def top_gainers():

    return get_top_gainers()