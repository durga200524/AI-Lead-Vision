import os
import pandas as pd


def export_csv(file_path):
    # Read Excel
    df = pd.read_excel(file_path, sheet_name="Consolidated_MIS")

    # Clean column names
    df.columns = df.columns.str.strip()

    # Create exports folder if it doesn't exist
    export_folder = "exports"
    os.makedirs(export_folder, exist_ok=True)

    # Generate CSV filename
    csv_filename = os.path.splitext(os.path.basename(file_path))[0] + ".csv"
    csv_path = os.path.join(export_folder, csv_filename)

    # Save CSV
    df.to_csv(csv_path, index=False)

    return {
        "message": "CSV exported successfully.",
        "file_name": csv_filename,
        "file_path": csv_path
    }