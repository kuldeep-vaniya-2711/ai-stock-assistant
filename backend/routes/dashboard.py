from fastapi import APIRouter

from services.dashboard_service import dashboard_summary

router = APIRouter()

@router.get("/dashboard/{email}")

def dashboard(email:str):

    return dashboard_summary(email)