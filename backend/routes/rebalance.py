from fastapi import APIRouter

from services.rebalance_service import get_rebalance_plan

router = APIRouter(

    prefix="/rebalance",

    tags=["Portfolio Rebalancer"]

)


@router.get("/{email}")

def rebalance(email: str):

    return get_rebalance_plan(email)