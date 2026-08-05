import os

from fastapi import APIRouter, HTTPException, Query, Depends

from app.services.monthly_trend_service import monthly_trend
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/monthly-trend/{filename}")
def get_monthly_trend(
    filename: str,
    project: str | None = Query(None),
    developer: str | None = Query(None),
    location: str | None = Query(None),
    status: str | None = Query(None),
    search: str | None = Query(None),
    current_user=Depends(get_current_user),
):
    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found."
        )

    return monthly_trend(
        file_path=file_path,
        project=project,
        developer=developer,
        location=location,
        status=status,
        search=search,
    )