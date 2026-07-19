from services.market_service import get_live_price
from services.indicators import calculate_indicators
from services.recommendation import get_recommendation

STOCKS = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "SBIN.NS",
    "LT.NS",
    "ITC.NS",
    "AXISBANK.NS",
    "BHARTIARTL.NS"
]


def get_screened_stocks():

    results = []

    for symbol in STOCKS:

        try:

            indicators = calculate_indicators(symbol)

            if not indicators:
                continue

            recommendation = get_recommendation(indicators)

            results.append({

                "symbol": symbol,

                "price": round(get_live_price(symbol), 2),

                "rsi": round(indicators["rsi"], 2),

                "recommendation": recommendation["recommendation"]

            })

        except Exception as e:

            print(e)
            continue

    return results