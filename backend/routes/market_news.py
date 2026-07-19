from fastapi import APIRouter

from services.market_news_service import get_market_news

router = APIRouter(

    prefix="/market",

    tags=["Market News"]

)


@router.get("/news")
def market_news():

    return get_market_news()