from sqlalchemy.orm import Session
from app import models

def create_file(db: Session, filename: str, filepath: str):
    db_file = models.UploadedFile(
        filename=filename,
        filepath=filepath
    )

    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    return db_file