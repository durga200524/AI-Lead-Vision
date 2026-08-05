import { useState } from "react";
import { uploadExcel } from "../services/uploadService";

function UploadExcel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an Excel file.");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadExcel(selectedFile);

      // Save uploaded filename in browser storage
      localStorage.setItem("uploadedFilename", result.filename);

      // Show success message
      setMessage(result.message || "File uploaded successfully!");

      alert("File uploaded successfully!");

      // Redirect to Dashboard
      window.location.href = "/";
    } catch (error) {
      console.error(error);

      setMessage("Upload failed!");

      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "40px auto",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
        }}
      >
        📤 Upload MIS Excel File
      </h1>

      <p
        style={{
          color: "#64748B",
          marginBottom: "25px",
        }}
      >
        Select an Excel (.xlsx or .xls) file to generate analytics.
      </p>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        style={{
          marginBottom: "20px",
        }}
      />

      <br />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "12px 25px",
          background: loading ? "#94A3B8" : "#2563EB",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {loading ? "Uploading..." : "Upload Excel"}
      </button>

      {selectedFile && (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: "#F8FAFC",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
          }}
        >
          <strong>Selected File:</strong>
          <br />
          {selectedFile.name}
        </div>
      )}

      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            background: message.includes("failed")
              ? "#FEE2E2"
              : "#DCFCE7",
            color: message.includes("failed")
              ? "#B91C1C"
              : "#166534",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default UploadExcel;