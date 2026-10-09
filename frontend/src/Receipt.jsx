
import { useEffect, useState } from "react";

function Receipt({ setPage }) {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/receipts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch receipts");
        }
        return response.json();
      })
      .then((data) => {
        setReceipts(data);
      })
      .catch((error) => {
        console.error("Error fetching receipts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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

      <h2>Payment Receipts</h2>
      <p>View your payment receipt records.</p>

      {loading ? (
        <p>Loading receipts...</p>
      ) : receipts.length === 0 ? (
        <p>No receipt records found.</p>
      ) : (
        <>
          <button onClick={() => window.print()}>
            Print Receipts
          </button>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={cellStyle}>Receipt ID</th>
                <th style={cellStyle}>Receipt Number</th>
                <th style={cellStyle}>Payment ID</th>
                <th style={cellStyle}>Receipt Date</th>
                <th style={cellStyle}>Amount</th>
              </tr>
            </thead>

            <tbody>
              {receipts.map((receipt) => (
                <tr key={receipt.receiptId}>
                  <td style={cellStyle}>{receipt.receiptId}</td>
                  <td style={cellStyle}>
                    {receipt.receiptNumber || `REC-2026-${String(receipt.receiptId).padStart(4, "0")}`}
                  </td>
                  <td style={cellStyle}>{receipt.paymentId}</td>
                  <td style={cellStyle}>{receipt.receiptDate}</td>
                  <td style={cellStyle}>
                    ₹{Number(receipt.receiptAmount || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Receipt;
