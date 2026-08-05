import pandas as pd


def read_excel(file_path):
    # Read all sheet names
    excel_file = pd.ExcelFile(file_path)

    result = {
        "sheet_names": excel_file.sheet_names,
        "data": {}
    }

    # Read each sheet
    for sheet in excel_file.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet)

        result["data"][sheet] = {
            "rows": len(df),
            "columns": list(df.columns),
            "preview": df.head(5).fillna("").to_dict(orient="records")
        }

    return result