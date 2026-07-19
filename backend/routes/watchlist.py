from fastapi import APIRouter

from models.watchlist import WatchlistItem
from services.watchlist_service import (
    add_to_watchlist,
    get_watchlist,
)

from services.watchlist_service import (
    add_to_watchlist,
    get_watchlist,
    remove_from_watchlist
)

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])


@router.post("/add")
def add(item: WatchlistItem):
    return add_to_watchlist(item)


@router.get("/{email}")
def get(email: str):
    return get_watchlist(email)

@router.delete("/remove")
def remove(email: str, symbol: str):
    return remove_from_watchlist(email, symbol)