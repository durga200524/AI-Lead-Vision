import os

from fastapi import APIRouter, HTTPException, Depends

from app.services.excel_reader import read_excel
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/analyze/{filename}")
def analyze_excel(
    filename: str,
    current_user=Depends(get_current_user),
):
    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found."
        )

    return read_excel(file_path)