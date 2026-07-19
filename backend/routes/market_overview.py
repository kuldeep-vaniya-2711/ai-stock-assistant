from fastapi import APIRouter

from services.market_overview_service import (
    get_top_gainers,
    get_top_losers,
    get_trending_stocks,
    get_most_active
)

router = APIRouter(
    prefix="/market",
    tags=["Market Overview"]
)


@router.get("/top-gainers")
def top_gainers():

    return get_top_gainers()


@router.get("/top-losers")
def top_losers():

    return get_top_losers()


@router.get("/trending")
def trending():

    return get_trending_stocks()


@router.get("/most-active")
def most_active():

    return get_most_active()