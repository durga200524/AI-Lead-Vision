import os
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_excel(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Check Excel file
    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(
            status_code=400,
            detail="Only Excel files are allowed."
        )

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Save details in PostgreSQL
    saved_file = crud.create_file(
        db=db,
        filename=file.filename,
        filepath=file_path
    )

    return {
        "message": "File uploaded successfully!",
        "id": saved_file.id,
        "filename": saved_file.filename,
        "filepath": saved_file.filepath
    }