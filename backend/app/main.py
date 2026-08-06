from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Authentication
from app.auth.auth import router as auth_router

# Routes
from app.routes.upload import router as upload_router
from app.routes.dashboard import router as dashboard_router
from app.routes.monthly_trend import router as monthly_trend_router
from app.routes.status_distribution import router as status_distribution_router
from app.routes.project_summary import router as project_summary_router
from app.routes.location_summary import router as location_summary_router
from app.routes.developer_summary import router as developer_summary_router
from app.routes.revenue_analysis import router as revenue_analysis_router
from app.routes.analytics import router as analytics_router
from app.routes.export import router as export_router
from app.routes.filters import router as filters_router
from app.routes.drilldown import router as drilldown_router
from app.routes.ai_copilot import router as ai_copilot_router

app = FastAPI(
    title="MIS Analytics Copilot API",
    version="1.0.0",
)

# ==========================
# CORS Configuration
# ==========================

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ai-lead-vision-frontend.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-lead-vision-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Register Routes
# ==========================

app.include_router(auth_router)

app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(monthly_trend_router)
app.include_router(status_distribution_router)
app.include_router(project_summary_router)
app.include_router(location_summary_router)
app.include_router(developer_summary_router)
app.include_router(revenue_analysis_router)
app.include_router(analytics_router)
app.include_router(export_router)
app.include_router(filters_router)
app.include_router(drilldown_router)
app.include_router(ai_copilot_router)

# ==========================
# Root API
# ==========================

@app.get("/")
def root():
    return {
        "message": "MIS Analytics Copilot API is running successfully!"
    }