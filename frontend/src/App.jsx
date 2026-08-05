import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadExcel from "./pages/UploadExcel";
import AICopilot from "./pages/AICopilot";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Upload */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadExcel />
            </ProtectedRoute>
          }
        />

        {/* AI Copilot */}
        <Route
          path="/copilot"
          element={
            <ProtectedRoute>
              <AICopilot />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;