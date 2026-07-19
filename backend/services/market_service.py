import yfinance as yf
import math


TOP_GAINER_SYMBOLS = [
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


# ----------------------------
# Helper
# ----------------------------

def clean_number(value):

    try:

        value = float(value)

        if math.isnan(value) or math.isinf(value):
            return 0

        return value

    except:

        return 0



# ----------------------------
# Live Price
# IMPORTANT:
# Portfolio system uses this
# ----------------------------

def get_live_price(symbol):

    try:

        stock = yf.Ticker(symbol)

        history = stock.history(period="1d")


        if history.empty:
            return None


        price = history["Close"].iloc[-1]


        price = clean_number(price)


        if price == 0:
            return None


        return round(price,2)


    except Exception:

        return None




# ----------------------------
# Top Gainers
# ----------------------------

def get_top_gainers():

    gainers=[]


    for symbol in TOP_GAINER_SYMBOLS:

        try:

            stock=yf.Ticker(symbol)

            data=stock.history(period="2d")


            if len(data)<2:
                continue


            previous=clean_number(
                data["Close"].iloc[-2]
            )

            current=clean_number(
                data["Close"].iloc[-1]
            )


            if previous==0:
                continue


            change=((current-previous)/previous)*100


            gainers.append({

                "symbol":symbol,
                "price":round(current,2),
                "change":round(change,2)

            })


        except:

            continue



    gainers.sort(
        key=lambda x:x["change"],
        reverse=True
    )


    return gainers[:5]





# ----------------------------
# Top Losers
# ----------------------------

def get_top_losers():

    losers=[]


    for symbol in TOP_GAINER_SYMBOLS:

        try:

            stock=yf.Ticker(symbol)

            data=stock.history(period="2d")


            if len(data)<2:
                continue


            previous=clean_number(
                data["Close"].iloc[-2]
            )

            current=clean_number(
                data["Close"].iloc[-1]
            )


            if previous==0:
                continue


            change=((current-previous)/previous)*100


            losers.append({

                "symbol":symbol,
                "price":round(current,2),
                "change":round(change,2)

            })


        except:

            continue



    losers.sort(
        key=lambda x:x["change"]
    )


    return losers[:5]





# ----------------------------
# Trending Stocks
# ----------------------------

def get_trending_stocks():

    trending=[]


    for symbol in TOP_GAINER_SYMBOLS:

        try:

            stock=yf.Ticker(symbol)

            data=stock.history(period="1mo")


            if len(data)<5:
                continue


            old=clean_number(
                data["Close"].iloc[-5]
            )


            current=clean_number(
                data["Close"].iloc[-1]
            )


            if old==0:
                continue


            change=((current-old)/old)*100


            trending.append({

                "symbol":symbol,
                "price":round(current,2),
                "change":round(change,2)

            })


        except:

            continue



    trending.sort(
        key=lambda x:abs(x["change"]),
        reverse=True
    )


    return trending[:5]







# ----------------------------
# Most Active Stocks
# ----------------------------

def get_most_active_stocks():

    active = []

    for symbol in TOP_GAINER_SYMBOLS:

        try:

            stock = yf.Ticker(symbol)

            data = stock.history(period="2d")

            if len(data) < 2:
                continue

            previous = clean_number(data["Close"].iloc[-2])
            current = clean_number(data["Close"].iloc[-1])

            if previous <= 0:
                continue

            change = ((current - previous) / previous) * 100

            # Safe Volume
            volume = 0

            try:
                info = stock.fast_info

                raw_volume = info.get("last_volume", 0)

                if raw_volume is None:
                    raw_volume = 0

                raw_volume = clean_number(raw_volume)

                volume = int(raw_volume)

            except:
                volume = 0

            active.append({

                "symbol": symbol,
                "price": round(current, 2),
                "change": round(change, 2),
                "volume": volume

            })

        except Exception:
            continue

    active.sort(
        key=lambda x: x["volume"],
        reverse=True
    )

    return active[:5]