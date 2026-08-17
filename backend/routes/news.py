from fastapi import APIRouter

from services.news_service import get_stock_news

router = APIRouter(

    prefix="/news",

    tags=["News"]

)


@router.get("/{symbol}")
def stock_news(symbol: str):

    news = get_stock_news(symbol)

    return {

        "symbol": symbol.upper(),

        "total_news": len(news),

        "news": news

    }