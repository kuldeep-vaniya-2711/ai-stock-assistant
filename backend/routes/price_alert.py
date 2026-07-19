from fastapi import APIRouter

from models.price_alert import PriceAlert

from services.price_alert_service import (
    create_alert,
    get_alerts,
    delete_alert,
    check_price_alerts
)

router = APIRouter(
    prefix="/price-alert",
    tags=["Price Alerts"]
)


@router.post("/create")
def create(item: PriceAlert):

    return create_alert(item)


@router.get("/{email}")
def get(email: str):

    return get_alerts(email)
@router.delete("/delete")
def delete(
    email: str,
    symbol: str,
    target_price: float
):

    return delete_alert(
        email,
        symbol,
        target_price
    )


@router.get("/check/all")
def check():

    return check_price_alerts()