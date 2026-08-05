import os

from fastapi import APIRouter, HTTPException, Depends

from app.services.export_service import export_csv
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/export/csv/{filename}")
def export_file(
    filename: str,
    current_user=Depends(get_current_user),
):

    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found."
        )

    return export_csv(file_path)