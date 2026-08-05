import os

from fastapi import APIRouter, HTTPException, Depends

from app.services.revenue_analysis_service import revenue_analysis
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/revenue-analysis/{filename}")
def get_revenue_analysis(
    filename: str,
    current_user=Depends(get_current_user),
):

    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found."
        )

    return revenue_analysis(file_path)