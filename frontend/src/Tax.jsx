
import { useEffect, useState } from "react";

function Tax({ setPage }) {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/tax-assessments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tax assessments");
        }
        return response.json();
      })
      .then((data) => {
        setAssessments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to connect to backend");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "25px" }}>

        <button
          onClick={() => setPage("dashboard")}
          style={{
            marginBottom: "15px",
            padding: "9px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#1f2937",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Dashboard
        </button>

        <h2
          style={{
            margin: "0",
            fontSize: "28px",
            fontWeight: "600",
            color: "#1f2937",
          }}
        >
          Tax Details
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
            fontSize: "15px",
          }}
        >
          View your property tax assessment and payment details.
        </p>
      </div>

      {loading ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p>Loading tax details...</p>
        </div>
      ) : assessments.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p>No tax assessment records found.</p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflowX: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1100px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f1f5f9",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <th style={headerStyle}>Assessment ID</th>
                <th style={headerStyle}>Tax Year</th>
                <th style={headerStyle}>Property ID</th>
                <th style={headerStyle}>Taxable Value</th>
                <th style={headerStyle}>Tax Rate</th>
                <th style={headerStyle}>Tax Amount</th>
                <th style={headerStyle}>Paid Amount</th>
                <th style={headerStyle}>Balance</th>
                <th style={headerStyle}>Due Date</th>
                <th style={headerStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {assessments.map((tax) => (
                <tr
                  key={tax.assessmentId}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={cellStyle}>{tax.assessmentId}</td>

                  <td style={cellStyle}>{tax.taxYear}</td>

                  <td style={cellStyle}>{tax.propertyId}</td>

                  <td style={cellStyle}>
                    ₹{Number(tax.taxableValue).toLocaleString("en-IN")}
                  </td>

                  <td style={cellStyle}>{tax.taxRate}%</td>

                  <td style={cellStyle}>
                    ₹{Number(tax.taxAmount).toLocaleString("en-IN")}
                  </td>

                  <td style={cellStyle}>
                    ₹{Number(tax.paidAmount).toLocaleString("en-IN")}
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      fontWeight: "600",
                    }}
                  >
                    ₹{Number(tax.balanceAmount).toLocaleString("en-IN")}
                  </td>

                  <td style={cellStyle}>{tax.dueDate}</td>

                  <td style={cellStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        backgroundColor:
                          tax.status === "Paid"
                            ? "#dcfce7"
                            : tax.status === "Partial"
                              ? "#fef3c7"
                              : "#fee2e2",
                        color:
                          tax.status === "Paid"
                            ? "#166534"
                            : tax.status === "Partial"
                              ? "#92400e"
                              : "#991b1b",
                      }}
                    >
                      {tax.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const headerStyle = {
  padding: "16px 14px",
  textAlign: "left",
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
  whiteSpace: "nowrap",
};

const cellStyle = {
  padding: "16px 14px",
  fontSize: "14px",
  color: "#4b5563",
  whiteSpace: "nowrap",
};

export default Tax;

