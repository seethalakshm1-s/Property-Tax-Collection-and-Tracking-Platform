import { useEffect, useState } from "react";

function Payment({ setPage, user }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/payments/user/${user.userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }

        return response.json();
      })
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Payment fetch error:", error);
        alert("Unable to connect to backend");
        setLoading(false);
      });
  }, []);

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="payment-page">

      <div className="payment-container">

        {/* Header */}
        <div className="payment-header">

          <div>
            <span className="payment-label">
              PAYMENT INFORMATION
            </span>

            <h1>Payment History</h1>

            <p>
              View your previous property tax payment records.
            </p>
          </div>

          <button
            type="button"
            className="back-button"
            onClick={() => setPage("dashboard")}
          >
            ← Dashboard
          </button>

        </div>


        {/* Summary */}
        <div className="payment-summary">

          <div className="summary-card">
            <span>Total Payments</span>
            <strong>{payments.length}</strong>
          </div>

          <div className="summary-card">
            <span>Total Amount Paid</span>
            <strong>
              ₹
              {formatAmount(
                payments.reduce(
                  (total, payment) =>
                    total + Number(payment.amount || 0),
                  0
                )
              )}
            </strong>
          </div>

          <div className="summary-card">
            <span>Successful Payments</span>
            <strong>
              {
                payments.filter(
                  (payment) =>
                    payment.status === "Success"
                ).length
              }
            </strong>
          </div>

        </div>


        {/* Payment Table */}
        <div className="payment-card">

          <div className="card-header">
            <div>
              <h2>Payment Records</h2>
              <p>
                Your property tax payment transactions.
              </p>
            </div>

            <div className="payment-icon">
              ₹
            </div>
          </div>


          {loading ? (

            <div className="loading-state">
              Loading payment records...
            </div>

          ) : payments.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                💳
              </div>

              <h3>No payment records found</h3>

              <p>
                Your property tax payment history will appear here.
              </p>

            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Assessment ID</th>
                    <th>Payment Date</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Payment Reference</th>
                    <th>Transaction ID</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {payments.map((payment) => (

                    <tr key={payment.paymentId}>

                      <td>
                        #{payment.paymentId}
                      </td>

                      <td>
                        {payment.assessmentId}
                      </td>

                      <td>
                        {payment.paymentDate || "—"}
                      </td>

                      <td className="amount">
                        ₹{formatAmount(payment.amount)}
                      </td>

                      <td>
                        {payment.paymentMethod || "—"}
                      </td>

                      <td>
                        {payment.paymentReference || "—"}
                      </td>

                      <td>
                        {payment.transactionId || "—"}
                      </td>

                      <td>
                        <span
                          className={
                            payment.status === "Success"
                              ? "status success"
                              : "status pending"
                          }
                        >
                          {payment.status || "Pending"}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* Footer Note */}
        <div className="payment-note">

          <strong>Payment History</strong>

          <span>
            Keep your payment references and transaction details
            for future reference.
          </span>

        </div>

      </div>


      <style>{`

        .payment-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 40px 20px;
          box-sizing: border-box;
        }

        .payment-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .payment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .payment-label {
          display: block;
          margin-bottom: 7px;
          color: #174a7c;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .payment-header h1 {
          margin: 0 0 7px;
          color: #172b4d;
          font-size: 30px;
        }

        .payment-header p {
          margin: 0;
          color: #6b7280;
          font-size: 15px;
        }

        .back-button {
          padding: 11px 18px;
          border: 1px solid #174a7c;
          border-radius: 6px;
          background: #ffffff;
          color: #174a7c;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .back-button:hover {
          background: #f1f5f9;
        }

        .payment-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .summary-card {
          padding: 22px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
        }

        .summary-card span {
          display: block;
          margin-bottom: 9px;
          color: #6b7280;
          font-size: 14px;
        }

        .summary-card strong {
          color: #172b4d;
          font-size: 24px;
        }

        .payment-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 28px;
          border-bottom: 1px solid #e5e7eb;
        }

        .card-header h2 {
          margin: 0 0 5px;
          color: #172b4d;
          font-size: 20px;
        }

        .card-header p {
          margin: 0;
          color: #7b8794;
          font-size: 14px;
        }

        .payment-icon {
          width: 42px;
          height: 42px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          background: #eef4f9;
          color: #174a7c;
          font-size: 20px;
          font-weight: 700;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 1000px;
          border-collapse: collapse;
        }

        th {
          padding: 15px 18px;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          white-space: nowrap;
        }

        td {
          padding: 16px 18px;
          border-bottom: 1px solid #edf1f5;
          color: #374151;
          font-size: 13px;
          white-space: nowrap;
        }

        tbody tr:hover {
          background: #fafcff;
        }

        .amount {
          color: #172b4d;
          font-weight: 700;
        }

        .status {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .status.success {
          background: #e8f7ee;
          color: #16803c;
        }

        .status.pending {
          background: #fff5df;
          color: #9a6700;
        }

        .loading-state {
          padding: 60px 20px;
          text-align: center;
          color: #6b7280;
          font-size: 15px;
        }

        .empty-state {
          padding: 65px 20px;
          text-align: center;
        }

        .empty-icon {
          font-size: 42px;
          margin-bottom: 15px;
        }

        .empty-state h3 {
          margin: 0 0 8px;
          color: #374151;
        }

        .empty-state p {
          margin: 0;
          color: #7b8794;
          font-size: 14px;
        }

        .payment-note {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 18px;
          padding: 15px 18px;
          border: 1px solid #e2e8f0;
          border-radius: 7px;
          background: #ffffff;
          color: #6b7280;
          font-size: 13px;
        }

        .payment-note strong {
          color: #374151;
        }

        @media (max-width: 750px) {

          .payment-page {
            padding: 25px 15px;
          }

          .payment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .payment-summary {
            grid-template-columns: 1fr;
          }

          .payment-note {
            flex-direction: column;
            gap: 6px;
          }

        }

      `}</style>

    </div>
  );
}
export default Payment;