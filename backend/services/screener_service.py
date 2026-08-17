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

            live_price = get_live_price(symbol)

            if live_price is None:
                continue

            results.append({

                "symbol": symbol,

                "price": round(live_price, 2),

                "rsi": round(indicators.get("rsi", 0), 2),

                "recommendation": recommendation.get(
                    "recommendation",
                    "HOLD"
                )

            })

        except Exception as e:

            print(f"Screener Error ({symbol}): {e}")

            continue

    return results