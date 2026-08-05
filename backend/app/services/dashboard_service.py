import pandas as pd


def dashboard_summary(
    file_path,
    project=None,
    developer=None,
    location=None,
    status=None,
    search=None,
):
    # Read the correct sheet
    df = pd.read_excel(
        file_path,
        sheet_name="Consolidated_MIS"
    )

    # -----------------------------
    # Apply Filters
    # -----------------------------

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

    # -----------------------------
    # Global Search
    # -----------------------------

    if search:
        search = search.lower()

        df = df[
            df["Project"].astype(str).str.lower().str.contains(search, na=False)
            | df["Developer"].astype(str).str.lower().str.contains(search, na=False)
            | df["Location"].astype(str).str.lower().str.contains(search, na=False)
            | df["Unit_ID"].astype(str).str.lower().str.contains(search, na=False)
            | df["Customer_ID"].astype(str).str.lower().str.contains(search, na=False)
            | df["Unit_No"].astype(str).str.lower().str.contains(search, na=False)
        ]

    # -----------------------------
    # Dashboard Summary
    # -----------------------------

    summary = {
        "total_units": int(len(df)),
        "total_projects": int(df["Project"].nunique()),
        "total_developers": int(df["Developer"].nunique()),

        "available_units": int(
            df["Status"]
            .astype(str)
            .str.lower()
            .eq("available")
            .sum()
        ),

        "booked_units": int(
            df["Status"]
            .astype(str)
            .str.lower()
            .eq("booked")
            .sum()
        ),

        "cancelled_units": int(
            df["Status"]
            .astype(str)
            .str.lower()
            .eq("cancelled")
            .sum()
        ),

        "total_saleable_area": float(
            df["Saleable_Area_SqFt"].fillna(0).sum()
        ),

        "total_booking_value": float(
            df["Booking_Value_INR"].fillna(0).sum()
        ),

        "payment_received": float(
            df["Payment_Received_INR"].fillna(0).sum()
        ),

        "outstanding_amount": float(
            df["Outstanding_INR"].fillna(0).sum()
        ),
    }

    return summary