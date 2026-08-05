import os
import ollama

from fastapi import APIRouter, HTTPException, Depends
from app.auth.dependencies import get_current_user
from app.services.dashboard_service import dashboard_summary

router = APIRouter()


@router.get("/ai/{filename}")
def ai_copilot(
    filename: str,
    question: str,
    current_user=Depends(get_current_user),
):

    file_path = os.path.join("uploads", filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found."
        )

    data = dashboard_summary(file_path=file_path)

    q = question.lower()

    # ======================================
    # Quick KPI Responses
    # ======================================

    if "total units" in q:
        return {
            "answer": f"🏢 Total Units: {data['total_units']}"
        }

    elif "available" in q:
        return {
            "answer": f"🟢 Available Units: {data['available_units']}"
        }

    elif "booked" in q:
        return {
            "answer": f"📘 Booked Units: {data['booked_units']}"
        }

    elif "cancelled" in q:
        return {
            "answer": f"❌ Cancelled Units: {data['cancelled_units']}"
        }

    elif "developer" in q:
        return {
            "answer": f"👨‍💻 Total Developers: {data['total_developers']}"
        }

    elif "project" in q:
        return {
            "answer": f"🏗 Total Projects: {data['total_projects']}"
        }

    elif "outstanding" in q:
        return {
            "answer": f"💰 Outstanding Amount: ₹{data['outstanding_amount']:,}"
        }

    elif "booking rate" in q:

        rate = (
            data["booked_units"] /
            data["total_units"]
        ) * 100

        return {
            "answer": f"📈 Booking Rate: {rate:.2f}%"
        }

    # ======================================
    # AI Response using Ollama
    # ======================================

    else:

        try:

            prompt = f"""
You are a Senior Business Intelligence Analyst working for a real estate company.

Use ONLY the dashboard data provided below.

IMPORTANT RULES

1. Never invent numbers.
2. Never assume trends that are not supported by the data.
3. Compare values correctly.
4. If information is unavailable, say "Not enough data available."
5. Give recommendations only from the dashboard data.

Dashboard Data

Total Units: {data['total_units']}
Available Units: {data['available_units']}
Booked Units: {data['booked_units']}
Cancelled Units: {data['cancelled_units']}
Total Projects: {data['total_projects']}
Total Developers: {data['total_developers']}
Outstanding Amount: ₹{data['outstanding_amount']}

User Question:
{question}

Respond using exactly this structure:

## Executive Summary

Write 2-3 sentences.

## Key Insights

- Insight 1
- Insight 2
- Insight 3

## Risks

- Risk 1
- Risk 2

## Recommendations

- Recommendation 1
- Recommendation 2
- Recommendation 3

Keep the response professional, concise, and based only on the dashboard data.
"""

            response = ollama.chat(
                model="qwen2.5:3b",
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
            )

            return {
                "answer": response["message"]["content"]
            }

        except Exception as e:

            return {
                "answer": f"⚠️ AI Error: {str(e)}"
            }