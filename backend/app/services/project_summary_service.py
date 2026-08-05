import pandas as pd


def project_summary(
    file_path,
    project=None,
    developer=None,
    location=None,
    status=None,
    search=None,
):
    # Read Excel
    df = pd.read_excel(file_path, sheet_name="Consolidated_MIS")

    # Clean column names
    df.columns = df.columns.str.strip()

    # Apply Filters
    if project:
        df = df[df["Project"] == project]

    if developer:
        df = df[df["Developer"] == developer]

    if location:
        df = df[df["Location"] == location]

    if status:
        df = df[
            df["Status"]
            .astype(str)
            .str.lower()
            == status.lower()
        ]

    # Global Search
    if search:
        search = str(search).lower()

        df = df[
            df["Project"].astype(str).str.lower().str.contains(search, na=False)
            | df["Developer"].astype(str).str.lower().str.contains(search, na=False)
            | df["Location"].astype(str).str.lower().str.contains(search, na=False)
            | df["Unit_ID"].astype(str).str.lower().str.contains(search, na=False)
            | df["Customer_ID"].astype(str).str.lower().str.contains(search, na=False)
            | df["Unit_No"].astype(str).str.lower().str.contains(search, na=False)
        ]

    # Required columns
    required_columns = [
        "Project",
        "Unit_ID",
        "Status",
        "Booking_Value_INR",
        "Payment_Received_INR",
        "Outstanding_INR"
    ]

    missing_columns = [
        col for col in required_columns
        if col not in df.columns
    ]

    if missing_columns:
        return {
            "error": "Missing columns in Excel file.",
            "missing_columns": missing_columns,
            "available_columns": df.columns.tolist()
        }

    # Project Summary
    summary = (
        df.groupby("Project")
        .agg(
            Total_Units=("Unit_ID", "count"),
            Booked_Units=(
                "Status",
                lambda x: (
                    x.astype(str)
                    .str.lower()
                    .eq("booked")
                    .sum()
                )
            ),
            Total_Booking_Value=("Booking_Value_INR", "sum"),
            Payment_Received=("Payment_Received_INR", "sum"),
            Outstanding=("Outstanding_INR", "sum"),
        )
        .reset_index()
    )

    summary = summary.fillna(0)

    return summary.to_dict(orient="records")