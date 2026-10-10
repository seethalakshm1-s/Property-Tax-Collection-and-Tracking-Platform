
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ setPage, user }) {
  const [properties, setProperties] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [propertyResponse, assessmentResponse, paymentResponse] =
          await Promise.all([
            fetch("http://localhost:8080/api/properties"),
            fetch("http://localhost:8080/api/tax-assessments"),
            fetch("http://localhost:8080/api/payments"),
          ]);

        if (
          !propertyResponse.ok ||
          !assessmentResponse.ok ||
          !paymentResponse.ok
        ) {
          throw new Error("Unable to load dashboard data");
        }

        const propertyData = await propertyResponse.json();
        const assessmentData = await assessmentResponse.json();
        const paymentData = await paymentResponse.json();

        setProperties(Array.isArray(propertyData) ? propertyData : []);
        setAssessments(Array.isArray(assessmentData) ? assessmentData : []);
        setPayments(Array.isArray(paymentData) ? paymentData : []);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const userId = Number(user?.userId ?? user?.user_id);

  const userProperties = properties.filter(
    (property) => Number(property.userId ?? property.user_id) === userId
  );

  const userAssessments = assessments.filter((assessment) =>
    userProperties.some(
      (property) =>
        Number(property.propertyId ?? property.property_id) ===
        Number(assessment.propertyId ?? assessment.property_id)
    )
  );

  const userPayments = payments.filter((payment) =>
    userAssessments.some(
      (assessment) =>
        Number(assessment.assessmentId ?? assessment.assessment_id) ===
        Number(payment.assessmentId ?? payment.assessment_id)
    )
  );

  const totalProperties = userProperties.length;

  const totalTaxDue = userAssessments.reduce(
    (total, assessment) =>
      total + Number(assessment.balanceAmount ?? assessment.balance_amount ?? 0),
    0
  );
const totalTaxPaid = userAssessments.reduce(
  (total, assessment) =>
    total + Number(assessment.paidAmount ?? assessment.paid_amount ?? 0),
  0
);


  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const displayName = user?.name || user?.fullName || "Citizen";

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="brand-logo">PT</div>
          <div>
            <h2>Property Tax</h2>
            <p>Collection &amp; Tracking Platform</p>
          </div>
        </div>

        <div className="dashboard-account">
          <div className="account-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <strong>{displayName}</strong>
            <span>Citizen Account</span>
          </div>
          <button
            className="logout-button"
            onClick={() => setPage("login")}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-banner">
          <div>
            <span className="welcome-label">CITIZEN DASHBOARD</span>
            <h1>Welcome back, {displayName}!</h1>
            <p>
              Manage your properties, track tax dues, and review your payments
              in one place.
            </p>
          </div>
          <div className="welcome-icon">🏛️</div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Overview</h2>
              <p>Your property tax summary</p>
            </div>
          </div>

          <div className="summary-grid">
            <article className="summary-card">
              <div className="summary-icon blue">⌂</div>
              <p>My Properties</p>
              <h3>{loading ? "..." : totalProperties}</h3>
              <span>Registered properties</span>
            </article>

            <article className="summary-card">
              <div className="summary-icon orange">₹</div>
              <p>Tax Due</p>
              <h3>{loading ? "..." : formatCurrency(totalTaxDue)}</h3>
              <span>Outstanding balance</span>
            </article>

            <article className="summary-card">
              <div className="summary-icon green">✓</div>
              <p>Total Paid</p>
              <h3>{loading ? "..." : formatCurrency(totalTaxPaid)}</h3>
              <span>Payments recorded</span>
            </article>

            <article className="summary-card">
              <div className="summary-icon purple">▤</div>
              <p>Assessments</p>
              <h3>{loading ? "..." : userAssessments.length}</h3>
              <span>Your tax assessments</span>
            </article>
          </div>
        </section>

        <section className="dashboard-section properties-section">
          <div className="section-heading">
            <div>
              <h2>My Properties</h2>
              <p>Properties linked to your account</p>
            </div>
            <button
              className="primary-button"
              onClick={() => setPage("property")}
            >
              + View Properties
            </button>
          </div>

          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Assessment No.</th>
                  <th>Property Type</th>
                  <th>Address</th>
                  <th>Area (sq.ft.)</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="empty-message">
                      Loading your properties...
                    </td>
                  </tr>
                ) : userProperties.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-message">
                      No properties are linked to this account.
                    </td>
                  </tr>
                ) : (
                  userProperties.slice(0, 5).map((property) => (
                    <tr key={property.propertyId ?? property.property_id}>
                      <td className="assessment-number">
                        {property.assessmentNumber ??
                          property.assessment_number ??
                          "—"}
                      </td>
                      <td>{property.propertyType ?? property.property_type ?? "—"}</td>
                      <td>
                        {[
                          property.address,
                          property.street,
                        ]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </td>
                      <td>{property.area ?? "—"}</td>
                      <td>
                        <span className="category-badge">
                          {property.urbanOrRural ??
                            property.urban_or_rural ??
                            "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-bottom-grid">
          <article className="dashboard-panel">
            <div className="section-heading">
              <div>
                <h2>Tax Summary</h2>
                <p>Your current assessment status</p>
              </div>
            </div>

            {loading ? (
              <p className="panel-message">Loading tax summary...</p>
            ) : userAssessments.length === 0 ? (
              <p className="panel-message">No tax assessments available.</p>
            ) : (
              <div className="assessment-list">
                {userAssessments.slice(0, 5).map((assessment) => {
                  const status = assessment.status || "Pending";
                  const balance = Number(
                    assessment.balanceAmount ??
                      assessment.balance_amount ??
                      0
                  );

                  return (
                    <div
                      className="assessment-item"
                      key={assessment.assessmentId ?? assessment.assessment_id}
                    >
                      <div>
                        <strong>
                          Assessment #
                          {assessment.assessmentId ?? assessment.assessment_id}
                        </strong>
                        <span>
                          Due date: {assessment.dueDate ?? assessment.due_date ?? "Not set"}
                        </span>
                      </div>
                      <div className="assessment-right">
                        <strong>{formatCurrency(balance)}</strong>
                        <span
                          className={`status-badge ${String(status).toLowerCase()}`}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              className="text-button"
              onClick={() => setPage("tax")}
            >
              View all tax details →
            </button>
            
        <button
          className="action-button"
          onClick={() => setPage("receipt")}
        >
          <span className="action-icon">▧</span>
          <span>
            <strong>Payment Receipts</strong>
            <small>View your payment receipts</small>
          </span>
          <span className="action-arrow">→</span>
        </button>


          </article>

          <article className="dashboard-panel quick-actions-panel">
            <div className="section-heading">
              <div>
                <h2>Quick Actions</h2>
                <p>Common tasks</p>
              </div>
            </div>

            <button
              className="action-button"
              onClick={() => setPage("property")}
            >
              <span className="action-icon">⌂</span>
              <span>
                <strong>My Properties</strong>
                <small>View property information</small>
              </span>
              <span className="action-arrow">→</span>
            </button>

            <button
              className="action-button"
              onClick={() => setPage("tax")}
            >
              <span className="action-icon">₹</span>
              <span>
                <strong>Tax Assessments</strong>
                <small>Check tax amount and due dates</small>
              </span>
              <span className="action-arrow">→</span>
            </button>

            <button
              className="action-button"
              onClick={() => setPage("payment")}
            >
              <span className="action-icon">▤</span>
              <span>
                <strong>Payment History</strong>
                <small>Review recorded payments</small>
              </span>
              <span className="action-arrow">→</span>
            </button>
            <button
  className="action-button"
  onClick={() => setPage("complaint")}
>
  <span className="action-icon">📝</span>
  <span>
    <strong>Complaints</strong>
    <small>View property tax complaints</small>
  </span>
  <span className="action-arrow">→</span>
</button>
          </article>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>Property Tax Collection &amp; Tracking Platform</p>
        <span>Citizen Services Portal</span>
      </footer>
    </div>
  );
}

export default Dashboard;