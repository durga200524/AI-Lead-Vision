import os

from fastapi import APIRouter, HTTPException, Query, Depends

from app.services.status_distribution_service import status_distribution
from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/status-distribution/{filename}")
def get_status_distribution(
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

    result = status_distribution(
        file_path=file_path,
        project=project,
        developer=developer,
        location=location,
        status=status,
        search=search,
    )

    return result