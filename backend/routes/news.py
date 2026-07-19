from fastapi import APIRouter
from services.news_service import get_stock_news

router = APIRouter()


@router.get("/news/{symbol}")
def stock_news(symbol: str):

    news = get_stock_news(symbol)

    return {
        "symbol": symbol.upper(),
        "total_news": len(news),
        "news": news
    }