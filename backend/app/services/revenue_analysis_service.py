import pandas as pd


def revenue_analysis(file_path):
    # Read Excel
    df = pd.read_excel(file_path, sheet_name="Consolidated_MIS")

    # Clean column names
    df.columns = df.columns.str.strip()

    result = {
        "Total_Booking_Value": float(df["Booking_Value_INR"].sum()),
        "Total_Payment_Received": float(df["Payment_Received_INR"].sum()),
        "Total_Outstanding": float(df["Outstanding_INR"].sum()),
        "Average_Booking_Value": float(df["Booking_Value_INR"].mean()),
        "Maximum_Booking_Value": float(df["Booking_Value_INR"].max()),
        "Minimum_Booking_Value": float(df["Booking_Value_INR"].min())
    }

    return result