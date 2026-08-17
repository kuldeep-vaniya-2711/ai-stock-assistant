import yfinance as yf


def get_stock_news(symbol):

    try:

        ticker = yf.Ticker(symbol)

        news = ticker.news

        if not news:
            return []

        news_list = []

        for article in news[:5]:

            content = article.get("content", {})

            provider = content.get("provider", {})

            canonical = content.get("canonicalUrl", {})

            news_list.append({

                "title": content.get(
                    "title",
                    "No Title"
                ),

                "publisher": provider.get(
                    "displayName",
                    "Unknown"
                ),

                "link": canonical.get(
                    "url",
                    ""
                )

            })

        return news_list

    except Exception as e:

        print("News Error :", e)

        return []