import feedparser

RSS = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=%5ENSEI&region=US&lang=en-US"


def get_market_news():

    feed = feedparser.parse(RSS)

    news = []

    for item in feed.entries[:10]:

        news.append({

            "title": item.title,

            "link": item.link,

            "published": item.published

        })

    return news