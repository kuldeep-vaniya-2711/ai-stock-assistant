from fastapi import APIRouter

from services.portfolio_allocation_service import get_allocation

router = APIRouter(

    prefix="/portfolio",

    tags=["Portfolio"]

)


@router.get("/allocation/{email}")
def allocation(email: str):

    return get_allocation(email)