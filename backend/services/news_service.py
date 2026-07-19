import yfinance as yf


def get_stock_news(symbol):
    try:
        ticker = yf.Ticker(symbol)

        news = ticker.news

        if not news:
            return []

        news_list = []

        for article in news[:5]:

            news_list.append({
                "title": article.get("content", {}).get("title", "No Title"),
                "publisher": article.get("content", {}).get("provider", {}).get("displayName", "Unknown"),
                "link": article.get("content", {}).get("canonicalUrl", {}).get("url", "")
            })

        return news_list

    except Exception:
        return []