import pandas as pd


def drilldown_data(
    file_path,
    project=None,
    developer=None,
    location=None,
    status=None,
    month=None,
    search=None,
):
    # Read Excel
    df = pd.read_excel(file_path, sheet_name="Consolidated_MIS")

    # Clean column names
    df.columns = df.columns.str.strip()

    print("Month received:", month)
    print("Columns:", df.columns.tolist())

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

    if month:
        print("Total rows before filter:", len(df))

    df = df[
        df["Month"]
        .astype(str)
        .str.strip()
        .str.lower()
        == month.strip().lower()
    ]

    print("Total rows after filter:", len(df))
    print("Available months after filter:", df["Month"].unique())

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

    df = df.fillna("")

    return df.to_dict(orient="records")