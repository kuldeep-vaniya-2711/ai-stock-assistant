import yfinance as yf
import math


TOP_STOCK_SYMBOLS = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "SBIN.NS",
    "LT.NS",
    "BHARTIARTL.NS",
    "ITC.NS",
    "AXISBANK.NS"
]


# --------------------------------
# Helper
# --------------------------------

def clean_number(value):

    try:
        value = float(value)

        if math.isnan(value) or math.isinf(value):
            return 0

        return value

    except:
        return 0


# --------------------------------
# Live Price
# --------------------------------

def get_live_price(symbol):

    try:

        stock = yf.Ticker(symbol)

        try:
            price = stock.fast_info.get("lastPrice")

            if price:
                return round(clean_number(price), 2)

        except:
            pass

        history = stock.history(period="1d")

        if history.empty:
            return None

        price = clean_number(history["Close"].iloc[-1])

        if price == 0:
            return None

        return round(price, 2)

    except Exception:
        return None


# --------------------------------
# Common Helper
# --------------------------------

def get_price_change(symbol, period="2d"):

    try:

        stock = yf.Ticker(symbol)

        data = stock.history(period=period)

        if len(data) < 2:
            return None

        previous = clean_number(data["Close"].iloc[-2])
        current = clean_number(data["Close"].iloc[-1])

        if previous <= 0:
            return None

        change = ((current - previous) / previous) * 100

        return {
            "symbol": symbol,
            "price": round(current, 2),
            "change": round(change, 2)
        }

    except Exception:
        return None


# --------------------------------
# Top Gainers
# --------------------------------

def get_top_gainers():

    gainers = []

    for symbol in TOP_STOCK_SYMBOLS:

        item = get_price_change(symbol)

        if item:
            gainers.append(item)

    gainers.sort(
        key=lambda x: x["change"],
        reverse=True
    )

    return gainers[:5]


# --------------------------------
# Top Losers
# --------------------------------

def get_top_losers():

    losers = []

    for symbol in TOP_STOCK_SYMBOLS:

        item = get_price_change(symbol)

        if item:
            losers.append(item)

    losers.sort(
        key=lambda x: x["change"]
    )

    return losers[:5]


# --------------------------------
# Trending Stocks
# --------------------------------

def get_trending_stocks():

    trending = []

    for symbol in TOP_STOCK_SYMBOLS:

        try:

            stock = yf.Ticker(symbol)

            data = stock.history(period="7d")

            if len(data) < 5:
                continue

            old = clean_number(data["Close"].iloc[-5])

            current = clean_number(data["Close"].iloc[-1])

            if old <= 0:
                continue

            change = ((current - old) / old) * 100

            trending.append({

                "symbol": symbol,
                "price": round(current, 2),
                "change": round(change, 2)

            })

        except Exception:
            continue

    trending.sort(
        key=lambda x: abs(x["change"]),
        reverse=True
    )

    return trending[:5]


# --------------------------------
# Most Active Stocks
# --------------------------------

def get_most_active_stocks():

    active = []

    for symbol in TOP_STOCK_SYMBOLS:

        item = get_price_change(symbol)

        if not item:
            continue

        try:

            stock = yf.Ticker(symbol)

            volume = 0

            try:

                volume = int(
                    clean_number(
                        stock.fast_info.get("last_volume", 0)
                    )
                )

            except:
                volume = 0

            item["volume"] = volume

            active.append(item)

        except Exception:
            continue

    active.sort(
        key=lambda x: x["volume"],
        reverse=True
    )

    return active[:5]