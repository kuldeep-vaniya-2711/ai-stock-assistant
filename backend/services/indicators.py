import yfinance as yf
import pandas as pd

from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator, EMAIndicator, MACD
from ta.volatility import BollingerBands


def calculate_indicators(symbol: str):
    stock = yf.Ticker(symbol)

    df = stock.history(period="6mo")

    if df.empty:
        return None

    # RSI
    df["RSI"] = RSIIndicator(df["Close"], window=14).rsi()

    # SMA
    df["SMA20"] = SMAIndicator(df["Close"], window=20).sma_indicator()
    df["SMA50"] = SMAIndicator(df["Close"], window=50).sma_indicator()

    # EMA
    df["EMA20"] = EMAIndicator(df["Close"], window=20).ema_indicator()

    # MACD
    macd = MACD(df["Close"])
    df["MACD"] = macd.macd()
    df["MACD_SIGNAL"] = macd.macd_signal()

    # Bollinger Bands
    bb = BollingerBands(df["Close"])

    df["BB_UPPER"] = bb.bollinger_hband()
    df["BB_LOWER"] = bb.bollinger_lband()

    latest = df.iloc[-1]

    return {
        "price": round(float(latest["Close"]), 2),
        "rsi": round(float(latest["RSI"]), 2),
        "sma20": round(float(latest["SMA20"]), 2),
        "sma50": round(float(latest["SMA50"]), 2),
        "ema20": round(float(latest["EMA20"]), 2),
        "macd": round(float(latest["MACD"]), 2),
        "macd_signal": round(float(latest["MACD_SIGNAL"]), 2),
        "bb_upper": round(float(latest["BB_UPPER"]), 2),
        "bb_lower": round(float(latest["BB_LOWER"]), 2),
    }