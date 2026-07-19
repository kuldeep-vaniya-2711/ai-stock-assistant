from fastapi import APIRouter

from models.portfolio import PortfolioItem

from services.portfolio_service import (
    buy_stock,
    sell_stock,
    get_portfolio
)

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"]
)


@router.post("/buy")
def buy(item: PortfolioItem):
    return buy_stock(item)


@router.post("/sell")
def sell(item: PortfolioItem):
    return sell_stock(item)


@router.get("/{email}")
def get(email: str):
    return get_portfolio(email)