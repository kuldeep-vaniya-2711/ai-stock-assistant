from fastapi import APIRouter
from services.yahoo_service import get_stock_data

router = APIRouter()

@router.get("/stock/{symbol}")
def stock(symbol: str):

    data = get_stock_data(symbol)

    if data is None:
        return {"error": "Invalid Stock Symbol"}

    return data