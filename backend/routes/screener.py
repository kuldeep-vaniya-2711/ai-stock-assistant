from fastapi import APIRouter

from services.screener_service import get_screened_stocks

router = APIRouter(

    prefix="/screener",

    tags=["Stock Screener"]

)


@router.get("")
def screener():

    return get_screened_stocks()