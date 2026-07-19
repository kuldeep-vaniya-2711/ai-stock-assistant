from fastapi import APIRouter
from fastapi.responses import FileResponse

from services.report_service import generate_report

router = APIRouter()

@router.get("/report/{email}")
def report(email: str):

    filepath = generate_report(email)

    return FileResponse(

        filepath,

        media_type="application/pdf",

        filename="Portfolio_Report.pdf"

    )