
import { useEffect, useState } from "react";

function Complaint({ setPage }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/complaints")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        return response.json();
      })
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, []);

  const cellStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "left",
  };

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={() => setPage("dashboard")}>
        Back to Dashboard
      </button>

      <h2>Complaint Management</h2>
      <p>View and track your property tax complaints.</p>

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Subject</th>
              <th style={cellStyle}>Description</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Property ID</th>
              <th style={cellStyle}>Admin Remarks</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.complaintId}>
                <td style={cellStyle}>{complaint.complaintId}</td>
                <td style={cellStyle}>{complaint.subject}</td>
                <td style={cellStyle}>{complaint.description}</td>
                <td style={cellStyle}>{complaint.status}</td>
                <td style={cellStyle}>{complaint.propertyId}</td>
                <td style={cellStyle}>
                  {complaint.adminRemarks || "Not updated"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Complaint;
