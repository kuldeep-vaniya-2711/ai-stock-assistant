from fastapi import APIRouter
from services.indicators import calculate_indicators
from services.recommendation import get_recommendation

router = APIRouter()


@router.get("/analysis/{symbol}")
def analysis(symbol: str):

    data = calculate_indicators(symbol)

    if data is None:
        return {
            "error": "Invalid Stock Symbol"
        }

    decision = get_recommendation(data)

    return {
        "symbol": symbol.upper(),
        **data,
        **decision
    }