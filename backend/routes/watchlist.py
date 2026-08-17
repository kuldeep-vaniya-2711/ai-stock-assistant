from fastapi import APIRouter, Depends, HTTPException, status

from models.watchlist import WatchlistItem

from services.watchlist_service import (
    add_to_watchlist,
    get_watchlist,
    remove_from_watchlist
)

from utils.auth_dependency import get_current_user


router = APIRouter(
    prefix="/watchlist",
    tags=["Watchlist"]
)


# -----------------------------
# Add Watchlist
# -----------------------------
@router.post("/add")
def add(
    item: WatchlistItem,
    current_user: dict = Depends(get_current_user)
):

    if current_user["email"] != item.email:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized access."
        )

    return add_to_watchlist(item)


# -----------------------------
# Get Watchlist
# -----------------------------
@router.get("/{email}")
def get(
    email: str,
    current_user: dict = Depends(get_current_user)
):

    if current_user["email"] != email:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized access."
        )

    return get_watchlist(email)


# -----------------------------
# Remove Watchlist
# -----------------------------
@router.delete("/remove")
def remove(
    email: str,
    symbol: str,
    current_user: dict = Depends(get_current_user)
):

    if current_user["email"] != email:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized access."
        )

    return remove_from_watchlist(
        email,
        symbol
    )