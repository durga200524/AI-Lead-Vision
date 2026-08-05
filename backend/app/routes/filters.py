from pathlib import Path

from fastapi import APIRouter, HTTPException, Depends

from app.services.filter_service import get_filters
from app.auth.dependencies import get_current_user

router = APIRouter()

UPLOAD_DIR = Path("uploads")


@router.get("/filters/{filename}")
def filters(
    filename: str,
    current_user=Depends(get_current_user),
):
    file_path = UPLOAD_DIR / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    return get_filters(file_path)