import yfinance as yf

MARKET_SYMBOLS = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "SBIN.NS",
    "LT.NS",
    "BHARTIARTL.NS",
    "ITC.NS",
    "AXISBANK.NS",
]


def get_stock_change(symbol):

    try:

        stock = yf.Ticker(symbol)

        history = stock.history(period="2d")

        if len(history) < 2:
            return None

        previous = float(history["Close"].iloc[-2])

        current = float(history["Close"].iloc[-1])

        change = ((current - previous) / previous) * 100

        volume = int(history["Volume"].iloc[-1])

        return {

            "symbol": symbol,

            "price": round(current, 2),

            "change_percent": round(change, 2),

            "volume": volume

        }

    except Exception:

        return None


def get_top_gainers():

    data = []

    for symbol in MARKET_SYMBOLS:

        stock = get_stock_change(symbol)

        if stock:

            data.append(stock)

    data.sort(

        key=lambda x: x["change_percent"],

        reverse=True

    )

    return data[:5]


def get_top_losers():

    data = []

    for symbol in MARKET_SYMBOLS:

        stock = get_stock_change(symbol)

        if stock:

            data.append(stock)

    data.sort(

        key=lambda x: x["change_percent"]

    )

    return data[:5]


def get_trending_stocks():

    data = []

    for symbol in MARKET_SYMBOLS:

        stock = get_stock_change(symbol)

        if stock:

            data.append(stock)

    data.sort(

        key=lambda x: abs(x["change_percent"]),

        reverse=True

    )

    return data[:5]


def get_most_active():

    data = []

    for symbol in MARKET_SYMBOLS:

        stock = get_stock_change(symbol)

        if stock:

            data.append(stock)

    data.sort(

        key=lambda x: x["volume"],

        reverse=True

    )

    return data[:5]