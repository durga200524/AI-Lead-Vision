import pandas as pd


def status_distribution(
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

    # Status Distribution
    summary = (
        df.groupby("Status")
        .agg(
            Total_Units=("Unit_ID", "count"),
            Booking_Value=("Booking_Value_INR", "sum"),
            Payment_Received=("Payment_Received_INR", "sum"),
            Outstanding=("Outstanding_INR", "sum"),
        )
        .reset_index()
    )

    return summary.fillna(0).to_dict(orient="records")