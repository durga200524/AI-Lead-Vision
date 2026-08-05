import { useEffect, useState, useRef } from "react";

import {
  Building2,
  FolderKanban,
  Users,
  Home,
  CheckCircle2,
  XCircle,
  IndianRupee,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPICard from "../components/KPICard";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import StatusPieChart from "../components/StatusPieChart";
import ProjectSummaryChart from "../components/ProjectSummaryChart";
import LocationSummaryChart from "../components/LocationSummaryChart";
import DeveloperSummaryChart from "../components/DeveloperSummaryChart";

import { getDashboardData } from "../services/dashboardService";
import { getMonthlyTrend } from "../services/monthlyTrendService";
import { getStatusDistribution } from "../services/statusDistributionService";
import { getProjectSummary } from "../services/projectSummaryService";
import { getLocationSummary } from "../services/locationSummaryService";
import { getDeveloperSummary } from "../services/developerSummaryService";
import { getFilters } from "../services/filterService";
import { getDrilldownData } from "../services/drilldownService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
function Dashboard() {
  const filename =
    localStorage.getItem("uploadedFilename") ||
    "AI_Lead_Vision_Real_Estate_MIS_Copilot_PoC_12_Months.xlsx";

  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [projectSummary, setProjectSummary] = useState([]);
  const [locationSummary, setLocationSummary] = useState([]);
  const [developerSummary, setDeveloperSummary] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
const [selectedDeveloper, setSelectedDeveloper] = useState("");
const [selectedLocation, setSelectedLocation] = useState("");
const [selectedStatus, setSelectedStatus] = useState("");
const [kpiFilter, setKpiFilter] = useState("");
const [searchText, setSearchText] = useState("");
const [selectedMonth, setSelectedMonth] = useState("");
const [currentTime, setCurrentTime] = useState(new Date());

const [projects, setProjects] = useState([]);
const [developers, setDevelopers] = useState([]);
const [locations, setLocations] = useState([]);
const [statuses, setStatuses] = useState([]);

const [drilldownData, setDrilldownData] = useState([]);

const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 10;

const [sortField, setSortField] = useState("");
const [sortOrder, setSortOrder] = useState("asc");

const dashboardRef = useRef(null);

  const exportPDF = async () => {
  const input = dashboardRef.current;

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const pdfHeight = 297;

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save("MIS_Analytics_Dashboard_Report.pdf");
}; 
  
  const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(drilldownData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Drilldown Records"
  );

  XLSX.writeFile(
    workbook,
    "MIS_Analytics_Drilldown.xlsx"
  );
};

const handleSort = (field) => {
  if (sortField === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortOrder("asc");
  }

  setCurrentPage(1);
};

  useEffect(() => {
    async function loadDashboard() {
      try {
        const dashboardFilters = {
  project: selectedProject,
  developer: selectedDeveloper,
  location: selectedLocation,
  status: selectedStatus,
  search: searchText,
};

const drilldownFilters = {
  project: selectedProject,
  developer: selectedDeveloper,
  location: selectedLocation,
  status: kpiFilter || selectedStatus,
  month: selectedMonth,
  search: searchText,
};

const dashboard = await getDashboardData(filename, dashboardFilters);

const trend = await getMonthlyTrend(filename, dashboardFilters);

const status = await getStatusDistribution(filename, dashboardFilters);

const projectSummaryData = await getProjectSummary(
  filename,
  dashboardFilters
);

const locationSummaryData = await getLocationSummary(
  filename,
  dashboardFilters
);

const developerSummaryData = await getDeveloperSummary(
  filename,
  dashboardFilters
);

const filterData = await getFilters(filename);

const drilldown = await getDrilldownData(
  filename,
  drilldownFilters
);

        setDashboardData(dashboard);
setMonthlyTrend(trend);
setStatusData(status);
setProjectSummary(projectSummaryData);
setLocationSummary(locationSummaryData);
setDeveloperSummary(developerSummaryData);

setDrilldownData(drilldown);

setProjects(filterData.projects);
setDevelopers(filterData.developers);
setLocations(filterData.locations);
setStatuses(filterData.statuses);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    }

    loadDashboard();
  },
   [
  filename,
  selectedProject,
  selectedDeveloper,
  selectedLocation,
  selectedStatus,
  kpiFilter,
  selectedMonth,
  searchText,
]);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
  
  // Pagination calculations
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

// Sort the drilldown data
const sortedData = [...drilldownData].sort((a, b) => {
  if (!sortField) return 0;

  const valueA = a[sortField];
  const valueB = b[sortField];

  if (valueA < valueB) {
    return sortOrder === "asc" ? -1 : 1;
  }

  if (valueA > valueB) {
    return sortOrder === "asc" ? 1 : -1;
  }

  return 0;
});

// Get records for the current page
const currentRecords = sortedData.slice(
  indexOfFirstRecord,
  indexOfLastRecord
);

const totalPages = Math.ceil(drilldownData.length / recordsPerPage);

  if (!dashboardData) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "28px",
        fontWeight: "bold",
        color: "#2563EB",
      }}
    >
      ⏳ Loading MIS Analytics Dashboard...
    </div>
  );
}
  const selectStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1",
  fontSize: "15px",
  background: "#FFFFFF",
  width: "100%",
  outline: "none",
};
    return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F1F5F9",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <div
  ref={dashboardRef}
  style={{ padding: "30px" }}
>
          {/* Dashboard Header */}

<div
  style={{
    background: "linear-gradient(135deg, #2563EB, #7C3AED)",
    borderRadius: "20px",
    padding: "35px",
    color: "#FFFFFF",
    marginBottom: "35px",
    boxShadow: "0 12px 30px rgba(37,99,235,0.25)",
  }}
>
  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "38px",
      fontWeight: "700",
    }}
  >
    👋 Welcome Back, Admin
  </h1>

  <div
  style={{
    display: "flex",
    gap: "10px",
  }}
>
  <button
    onClick={exportPDF}
    style={{
      background: "#FFFFFF",
      color: "#2563EB",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }}
  >
    📄 Export PDF
  </button>

  <button
    onClick={exportExcel}
    style={{
      background: "#16A34A",
      color: "#FFFFFF",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }}
  >
    📊 Export Excel
  </button>

  <button
  onClick={() => window.location.reload()}
  style={{
    background: "#F59E0B",
    color: "#FFFFFF",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  }}
>
  🔄 Refresh
</button>

</div>
</div>

  <p
    style={{
      marginTop: "10px",
      fontSize: "18px",
      opacity: "0.95",
    }}
  >
    AI Lead Vision
  </p>

  <div
  style={{
    marginTop: "12px",
  }}
>
  <div
    style={{
      fontSize: "18px",
      fontWeight: "600",
      color: "#FFFFFF",
    }}
  >
    MIS Analytics Copilot
  </div>

  <div
    style={{
      marginTop: "6px",
      fontSize: "14px",
      color: "#E2E8F0",
      opacity: "0.9",
    }}
  >
    Enterprise Business Intelligence Platform
  </div>
</div>

  <div
    style={{
      marginTop: "25px",
      background: "rgba(255,255,255,0.15)",
      padding: "18px",
      borderRadius: "14px",
      display: "grid",
    }}
  >
    <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  }}
>
  <span
    style={{
      color: "#E2E8F0",
      fontSize: "14px",
      fontWeight: "600",
    }}
  >
    🟢 System Status
  </span>

  <span
    style={{
      color: "#BBF7D0",
      fontWeight: "700",
      fontSize: "14px",
    }}
  >
    LIVE
  </span>
</div>

<div
  style={{
    fontSize: "14px",
    color: "#E2E8F0",
    fontWeight: "600",
    textAlign: "left",
  }}
>
  📄 Active Dataset
</div>

    <div
      style={{
        marginTop: "8px",
        fontWeight: "600",
        fontSize: "16px",
        textAlign: "left",
      }}
    >
      {filename.length > 40
  ? filename.substring(0, 40) + "..."
  : filename}
    </div>

    <div
      style={{
        marginTop: "8px",
        color: "#BBF7D0",
        fontWeight: "600",
        textAlign: "left",
      }}
    >
      ✅ Uploaded Successfully
    </div>
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "18px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "14px",
  }}
>
  <span>📊 Projects</span>
  <strong>{dashboardData.total_projects}</strong>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  }}
>
  <span>👥 Developers</span>
  <strong>{dashboardData.total_developers}</strong>
</div>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  }}
>
  <span>📅 Last Updated</span>
  <strong>
  {currentTime.toLocaleDateString("en-IN")} <br />
  {currentTime.toLocaleTimeString("en-IN")}
</strong>
</div>
  </div>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "#FFFFFF",
      padding: "18px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <h4 style={{ color: "#64748B" }}>🟢 System Status</h4>
    <h2 style={{ color: "#16A34A" }}>LIVE</h2>
  </div>

  <div
    style={{
      background: "#FFFFFF",
      padding: "18px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <h4 style={{ color: "#64748B" }}>📄 Dataset</h4>
    <h3>{filename}</h3>
  </div>

  <div
    style={{
      background: "#FFFFFF",
      padding: "18px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <h4 style={{ color: "#64748B" }}>🏢 Total Units</h4>
    <h2>{dashboardData.total_units}</h2>
  </div>

  <div
    style={{
      background: "#FFFFFF",
      padding: "18px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <h4 style={{ color: "#64748B" }}>👨‍💻 Developers</h4>
    <h2>{dashboardData.total_developers}</h2>
  </div>
</div>

  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "#FFFFFF",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <h3 style={{ color: "#2563EB" }}>📊 Dashboard Summary</h3>

    <p><strong>Total Units:</strong> {dashboardData.total_units}</p>
    <p><strong>Available:</strong> {dashboardData.available_units}</p>
    <p><strong>Booked:</strong> {dashboardData.booked_units}</p>
    <p><strong>Cancelled:</strong> {dashboardData.cancelled_units}</p>

    <hr />

    <p>
      <strong>Booking Rate:</strong>{" "}
      {(
        (dashboardData.booked_units /
          dashboardData.total_units) *
        100
      ).toFixed(2)}
      %
    </p>

    <p>
      <strong>Cancellation Rate:</strong>{" "}
      {(
        (dashboardData.cancelled_units /
          dashboardData.total_units) *
        100
      ).toFixed(2)}
      %
    </p>
  </div>
</div>

          {/* KPI Cards - Row 1 */}
          {/* =========================
    Enterprise Filter Panel
========================= */}

<div
  style={{
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
  <h3
    style={{
      marginBottom: "20px",
      color: "#1E293B",
    }}
  >
    Dashboard Filters
  </h3>

  <div
  style={{
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search by Project, Developer, Location, Unit ID, Customer ID..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #CBD5E1",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    }}
  />
</div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
      gap: "20px",
    }}
  >
    {/* Project */}

    <select
      value={selectedProject}
      onChange={(e) => setSelectedProject(e.target.value)}
      style={selectStyle}
    >
      <option value="">All Projects</option>

      {projects.map((project) => (
        <option key={project} value={project}>
          {project}
        </option>
      ))}
    </select>

    {/* Developer */}

    <select
      value={selectedDeveloper}
      onChange={(e) => setSelectedDeveloper(e.target.value)}
      style={selectStyle}
    >
      <option value="">All Developers</option>

      {developers.map((developer) => (
        <option key={developer} value={developer}>
          {developer}
        </option>
      ))}
    </select>

    {/* Location */}

    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      style={selectStyle}
    >
      <option value="">All Locations</option>

      {locations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>

    {/* Status */}

    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      style={selectStyle}
    >
      <option value="">All Status</option>

      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  </div>

  <div
    style={{
      marginTop: "20px",
    }}
  >
    <button
      onClick={() => {
        setSelectedProject("");
        setSelectedDeveloper("");
        setSelectedLocation("");
        setSelectedStatus("");
        setKpiFilter("");
      }}
      style={{
        background: "#2563EB",
        color: "#FFFFFF",
        border: "none",
        padding: "12px 22px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      Reset Filters
    </button>
  </div>
</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <KPICard
  title="Total Units"
  value={dashboardData.total_units}
  growth="+12.4%"
  color="#2563EB"
  icon={<Building2 size={28} color="#2563EB" />}
/>

            <KPICard
              title="Projects"
              value={dashboardData.total_projects}
              color="#10B981"
              icon={<FolderKanban size={32} color="#10B981" />}
            />

            <KPICard
              title="Developers"
              value={dashboardData.total_developers}
              color="#F59E0B"
              icon={<Users size={32} color="#F59E0B" />}
            />

           <KPICard
  title="Available Units"
  value={dashboardData.available_units}
  color="#EF4444"
  icon={<Home size={32} color="#EF4444" />}
  onClick={() => setKpiFilter("Available")}
/>
          </div>

          {/* KPI Cards - Row 2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <KPICard
  title="Booked Units"
  value={dashboardData.booked_units}
  color="#8B5CF6"
  icon={<CheckCircle2 size={32} color="#8B5CF6" />}
  onClick={() => setKpiFilter("Booked")}
/>

            <KPICard
  title="Cancelled Units"
  value={dashboardData.cancelled_units}
  color="#EC4899"
  icon={<XCircle size={32} color="#EC4899" />}
  onClick={() => setKpiFilter("Cancelled")}
/>

            <KPICard
              title="Outstanding Amount"
              value={
               "₹" +
               (dashboardData.outstanding_amount / 10000000).toFixed(2) +
               " Cr"
             }
              color="#DC2626"
              icon={<IndianRupee size={32} color="#DC2626" />}
            />
          </div>

          {/* Charts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <MonthlyTrendChart
  data={monthlyTrend}
  selectedMonth={selectedMonth}
  onMonthClick={(month) => {
    setSelectedMonth(month);
  }}
/>
            <StatusPieChart
  data={statusData}
  onStatusClick={(status) => {
    setKpiFilter(status);
  }}
/>
          </div>
                    {/* Project Summary */}
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <ProjectSummaryChart
  data={projectSummary}
  onProjectClick={(project) => {
    setSelectedProject(project);
  }}
/>
          </div>

          {/* Location Summary */}
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <LocationSummaryChart
  data={locationSummary}
  onLocationClick={(location) => {
    setSelectedLocation(location);
  }}
/>
          </div>

          {/* Developer Summary */}
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <DeveloperSummaryChart
  data={developerSummary}
  onDeveloperClick={(developer) => {
    setSelectedDeveloper(developer);
  }}
/>
          </div>
  <div
  style={{
    background: "#FFFFFF",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    🤖 AI Business Insights
  </h2>

  <p>
    <strong>📈 Booking Rate:</strong>{" "}
    {(
      (dashboardData.booked_units / dashboardData.total_units) *
      100
    ).toFixed(2)}
    %
  </p>

  <p>
    <strong>⚠️ Cancellation Rate:</strong>{" "}
    {(
      (dashboardData.cancelled_units / dashboardData.total_units) *
      100
    ).toFixed(2)}
    %
  </p>

  <p>
    <strong>🏆 Best Developer:</strong>{" "}
    {developerSummary.length > 0
      ? developerSummary[0].Developer
      : "N/A"}
  </p>

  <p>
    <strong>📍 Top Project:</strong>{" "}
    {projectSummary.length > 0
      ? projectSummary[0].Project
      : "N/A"}
  </p>

  <p>
    <strong>💡 AI Recommendation:</strong><br />
    Increase marketing efforts for projects with the highest number of available units to improve booking conversions.
  </p>
</div>

         {/* Revenue Summary */}
<div
  style={{
    background: "#FFFFFF",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    Revenue Summary
  </h2>

  <hr style={{ marginBottom: "20px" }} />

  <p>
    <strong>Total Booking Value:</strong> ₹
    {dashboardData.total_booking_value.toLocaleString()}
  </p>

  <p>
    <strong>Payment Received:</strong> ₹
    {dashboardData.payment_received.toLocaleString()}
  </p>

  <p>
    <strong>Outstanding Amount:</strong> ₹
    {dashboardData.outstanding_amount.toLocaleString()}
  </p>

  <p>
    <strong>Total Saleable Area:</strong>{" "}
    {dashboardData.total_saleable_area.toLocaleString()} sq.ft
  </p>
</div>

{/* ===================== DRILLDOWN TABLE ===================== */}

<div
style={{
  background: "#FFFFFF",
  marginTop: "30px",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  overflowX: "auto",
  maxHeight: "600px",
  overflowY: "auto",
}}
>

  <h2 style={{ marginBottom: "20px" }}>
  Drilldown Records
  {selectedMonth
    ? ` (${selectedMonth})`
    : kpiFilter
    ? ` (${kpiFilter})`
    : " (All Units)"}
</h2>

  <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
  }}
>
    <thead
  style={{
    position: "sticky",
    top: 0,
    zIndex: 10,
  }}
>
      <tr
        style={{
          background: "#2563EB",
          color: "#FFFFFF",
        }}
      >
        <th style={{ padding: "12px" }}>Month</th>
<th
  onClick={() => handleSort("Project")}
  style={{
    padding: "12px",
    cursor: "pointer",
  }}
>
  Project {sortField === "Project" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
</th>
<th style={{ padding: "12px" }}>Developer</th>
<th style={{ padding: "12px" }}>Location</th>
<th style={{ padding: "12px" }}>Status</th>
<th
  onClick={() => handleSort("Unit_No")}
  style={{
    padding: "12px",
    cursor: "pointer",
  }}
>
  Unit No{" "}
  {sortField === "Unit_No"
    ? sortOrder === "asc"
      ? "▲"
      : "▼"
    : ""}
</th>
<th style={{ padding: "12px" }}>Customer ID</th>
      </tr>
    </thead>

    <tbody>
  {currentRecords.length === 0 ? (
    <tr>
      <td
        colSpan="7"
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#64748B",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        📭 No records found. Try changing your filters.
      </td>
    </tr>
  ) : (
    currentRecords.map((row, index) => (
      <tr
  key={index}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#EFF6FF";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#FFFFFF";
  }}
>
        <td style={{ padding: "10px", borderBottom: "1px solid #E2E8F0" }}>
          {row.Month}
        </td>

        <td style={{ padding: "10px", borderBottom: "1px solid #E2E8F0" }}>
          {row.Project}
        </td>

        <td style={{ padding: "10px", borderBottom: "1px solid #E2E8F0" }}>
          {row.Developer}
        </td>

        <td style={{ padding: "10px", borderBottom: "1px solid #E2E8F0" }}>
          {row.Location}
        </td>

        <td style={{ padding: "10px", borderBottom: "1px solid #E2E8F0" }}>
          {row.Status}
        </td>

        <td style={{ padding: "10px", borderBottom: "1px solid #E2E8F0" }}>
          {row.Unit_No}
        </td>

        <td style={{ padding: "10px", borderBottom: "1px solid #E2E8F0" }}>
          {row.Customer_ID}
        </td>
      </tr>
    ))
  )}
</tbody>
  </table>

  <p
  style={{
    marginTop: "15px",
    marginBottom: "15px",
    fontWeight: "600",
    color: "#475569",
  }}
>
  Showing {indexOfFirstRecord + 1} -{" "}
  {Math.min(indexOfLastRecord, drilldownData.length)} of{" "}
  {drilldownData.length} records
</p>

  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  }}
>
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    style={{
      padding: "10px 20px",
      background: currentPage === 1 ? "#CBD5E1" : "#2563EB",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "6px",
      cursor: currentPage === 1 ? "not-allowed" : "pointer",
    }}
  >
    ◀ Previous
  </button>

  <span style={{ fontWeight: "600" }}>
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    style={{
      padding: "10px 20px",
      background: currentPage === totalPages ? "#CBD5E1" : "#2563EB",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "6px",
      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
    }}
  >
    Next ▶
  </button>
</div>

</div>

</div>
</div>
</div>

);
}

export default Dashboard;