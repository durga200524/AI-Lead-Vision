import pandas as pd


def get_filters(file_path):
    df = pd.read_excel(
        file_path,
        sheet_name="Consolidated_MIS"
    )

    return {
        "projects": sorted(
            df["Project"]
            .dropna()
            .astype(str)
            .unique()
            .tolist()
        ),

        "developers": sorted(
            df["Developer"]
            .dropna()
            .astype(str)
            .unique()
            .tolist()
        ),

        "locations": sorted(
            df["Location"]
            .dropna()
            .astype(str)
            .unique()
            .tolist()
        ),

        "statuses": sorted(
            df["Status"]
            .dropna()
            .astype(str)
            .unique()
            .tolist()
        ),
    }