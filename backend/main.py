import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import database.mongodb


# -----------------------------
# Routes
# -----------------------------

from routes.stocks import router
from routes.analysis import router as analysis_router
from routes.news import router as news_router
from routes.watchlist import router as watchlist_router
from routes.auth import router as auth_router
from routes.portfolio import router as portfolio_router
from routes.user import router as user_router
from routes.transactions import router as transaction_router
from routes.portfolio_summary import router as portfolio_summary_router
from routes.portfolio_chart import router as portfolio_chart_router
from routes.market import router as market_router
from routes.market_overview import router as market_overview_router
from routes.otp import router as otp_router
from routes.analytics import router as analytics_router
from routes.chart import router as chart_router
from routes.ai import router as ai_router
from routes.ai_chat import router as ai_chat_router
from routes.dashboard import router as dashboard_router
from routes.notification import router as notification_router
from routes.portfolio_performance import router as portfolio_performance_router
from routes.portfolio_growth import router as portfolio_growth_router
from routes import price_alert
from routes.report import router as report_router
from routes.leaderboard import router as leaderboard_router
from routes.screener import router as screener_router
from routes.market_news import router as market_news_router
from routes.portfolio_allocation import router as portfolio_allocation_router
from routes.ai_recommendation import router as ai_recommendation_router
from routes.rebalance import router as rebalance_router


# -----------------------------
# Services
# -----------------------------

from services.price_alert_service import check_price_alerts


# -----------------------------
# Background Scheduler
# -----------------------------

async def price_alert_scheduler():

    while True:

        try:

            check_price_alerts()

        except Exception as e:

            print(
                "Price Alert Scheduler Error:",
                e
            )

        await asyncio.sleep(30)


# -----------------------------
# Application Lifespan
# -----------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):

    # Startup
    scheduler_task = asyncio.create_task(
        price_alert_scheduler()
    )

    print(
        "✅ Price Alert Scheduler Started"
    )

    yield

    # Shutdown
    scheduler_task.cancel()

    try:

        await scheduler_task

    except asyncio.CancelledError:

        print(
            "🛑 Price Alert Scheduler Stopped"
        )


# -----------------------------
# FastAPI App
# -----------------------------

app = FastAPI(

    title="AI Stock Assistant",

    lifespan=lifespan

)


# -----------------------------
# CORS
# -----------------------------

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)


# -----------------------------
# Routes
# -----------------------------

app.include_router(router)

app.include_router(
    analysis_router
)

app.include_router(
    news_router
)

app.include_router(
    watchlist_router
)

app.include_router(
    auth_router
)

app.include_router(
    portfolio_router
)

app.include_router(
    user_router
)

app.include_router(
    transaction_router
)

app.include_router(
    portfolio_summary_router
)

app.include_router(
    portfolio_chart_router
)

app.include_router(
    portfolio_performance_router
)

app.include_router(
    portfolio_growth_router
)

app.include_router(
    market_router
)

app.include_router(
    market_overview_router
)

app.include_router(
    notification_router
)

app.include_router(
    otp_router
)

app.include_router(
    analytics_router
)

app.include_router(
    chart_router
)

app.include_router(
    ai_router
)

app.include_router(
    ai_chat_router
)

app.include_router(
    dashboard_router
)

app.include_router(
    price_alert.router
)

app.include_router(
    report_router
)

app.include_router(
    leaderboard_router
)

app.include_router(
    screener_router
)

app.include_router(
    market_news_router
)

app.include_router(
    portfolio_allocation_router
)

app.include_router(
    ai_recommendation_router
)

app.include_router(
    rebalance_router
)


# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():

    return {

        "message":
        "AI Stock Assistant Running 🚀"

    }