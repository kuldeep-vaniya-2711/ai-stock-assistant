import yfinance as yf


def get_stock_data(symbol: str):
    stock = yf.Ticker(symbol)

    info = stock.info
    history = stock.history(period="1d")

    if history.empty:
        return None

    latest = history.iloc[-1]

    previous_close = info.get("previousClose", latest["Close"])

    current_price = float(latest["Close"])

    change = current_price - previous_close

    change_percent = (change / previous_close) * 100 if previous_close else 0

    return {
        "symbol": symbol.upper(),
        "company": info.get("longName", "Unknown"),
        "price": round(current_price, 2),
        "previous_close": round(previous_close, 2),
        "change": round(change, 2),
        "change_percent": round(change_percent, 2),
        "open": round(float(latest["Open"]), 2),
        "high": round(float(latest["High"]), 2),
        "low": round(float(latest["Low"]), 2),
        "volume": int(latest["Volume"]),
        "currency": info.get("currency", "")
    }