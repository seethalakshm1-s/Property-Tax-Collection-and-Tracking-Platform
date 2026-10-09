import { useEffect, useState } from "react";
import "./Admin.css";
function Admin({ setPage }) {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [taxRules, setTaxRules] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [verifications, setVerifications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch("http://localhost:8080/api/users"),
        fetch("http://localhost:8080/api/properties"),
        fetch("http://localhost:8080/api/tax-assessments"),
        fetch("http://localhost:8080/api/payments"),
        fetch("http://localhost:8080/api/complaints"),
        fetch("http://localhost:8080/api/receipts"),
        fetch("http://localhost:8080/api/tax-rules"),
        fetch("http://localhost:8080/api/notifications"),
        fetch("http://localhost:8080/api/property-verifications"),
      ]);

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      setUsers(data[0]);
      setProperties(data[1]);
      setAssessments(data[2]);
      setPayments(data[3]);
      setComplaints(data[4]);
      setReceipts(data[5]);
      setTaxRules(data[6]);
      setNotifications(data[7]);
      setVerifications(data[8]);
    } catch (error) {
      console.error("Admin dashboard error:", error);
    }
  };

  const paidAssessments = assessments.filter(
    (item) => item.status === "Paid"
  );

  const pendingAssessments = assessments.filter(
    (item) => item.status === "Pending"
  );

  const overdueAssessments = assessments.filter(
    (item) => item.status === "Overdue"
  );

  const verifiedProperties = verifications.filter(
    (item) => item.status === "Verified"
  );

  const pendingVerifications = verifications.filter(
    (item) => item.status === "Pending"
  );

  const totalCollection = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const formatDate = (date) => {
    if (!date) return "-";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) return date;

    return value.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (!status) return "status-neutral";

    const value = status.toLowerCase();

    if (
      value === "paid" ||
      value === "success" ||
      value === "verified" ||
      value === "resolved" ||
      value === "sent"
    ) {
      return "status-success";
    }

    if (
      value === "pending" ||
      value === "under verification" ||
      value === "pending verification"
    ) {
      return "status-warning";
    }

    if (value === "overdue" || value === "failed") {
      return "status-danger";
    }

    return "status-neutral";
  };

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Users", icon: "◉" },
    { name: "Properties", icon: "⌂" },
    { name: "Tax Assessments", icon: "▤" },
    { name: "Tax Rules", icon: "⚙" },
    { name: "Payments", icon: "₹" },
    { name: "Receipts", icon: "▥" },
    { name: "Complaints", icon: "?" },
    { name: "Notifications", icon: "♢" },
    { name: "Verification", icon: "✓" },
  ];

  const renderDashboard = () => {
    const maxPayment = Math.max(
      ...payments.map((payment) => Number(payment.amount || 0)),
      1
    );

    return (
      <div className="professional-dashboard">

        {/* PAGE HEADER */}
        <div className="page-header">
          <div>
            <div className="page-kicker">ADMINISTRATION</div>
            <h1>Dashboard</h1>
            <p>
              Monitor property tax collection, assessments and citizen
              services.
            </p>
          </div>

          <div className="header-date">
            <span>Today</span>
            <strong>
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </strong>
          </div>
        </div>

        {/* MAIN STAT CARDS */}
        <div className="kpi-grid">

          <div className="kpi-card blue">
            <div className="kpi-top">
              <div className="kpi-icon">⌂</div>
              <span className="kpi-label">PROPERTIES</span>
            </div>

            <div className="kpi-value">{properties.length}</div>

            <div className="kpi-footer">
              <span>Total registered properties</span>
              <b>View →</b>
            </div>
          </div>

          <div className="kpi-card green">
            <div className="kpi-top">
              <div className="kpi-icon">₹</div>
              <span className="kpi-label">COLLECTION</span>
            </div>

            <div className="kpi-value">
              {formatCurrency(totalCollection)}
            </div>

            <div className="kpi-footer">
              <span>Successful payments</span>
              <b>{payments.length}</b>
            </div>
          </div>

          <div className="kpi-card orange">
            <div className="kpi-top">
              <div className="kpi-icon">▤</div>
              <span className="kpi-label">ASSESSMENTS</span>
            </div>

            <div className="kpi-value">{assessments.length}</div>

            <div className="kpi-footer">
              <span>Tax assessment records</span>
              <b>{pendingAssessments.length} pending</b>
            </div>
          </div>

          <div className="kpi-card purple">
            <div className="kpi-top">
              <div className="kpi-icon">◉</div>
              <span className="kpi-label">CITIZENS</span>
            </div>

            <div className="kpi-value">{users.length}</div>

            <div className="kpi-footer">
              <span>Registered users</span>
              <b>Active</b>
            </div>
          </div>

        </div>

        {/* SMALL STATUS CARDS */}
        <div className="summary-grid">

          <div className="summary-card">
            <div className="summary-icon success">✓</div>
            <div>
              <span>Paid Assessments</span>
              <strong>{paidAssessments.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon warning">!</div>
            <div>
              <span>Pending Assessments</span>
              <strong>{pendingAssessments.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon danger">!</div>
            <div>
              <span>Overdue</span>
              <strong>{overdueAssessments.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon info">?</div>
            <div>
              <span>Complaints</span>
              <strong>{complaints.length}</strong>
            </div>
          </div>

        </div>

        {/* COLLECTION + STATUS */}
        <div className="dashboard-two-column">

          <section className="dashboard-card collection-card">
            <div className="card-header">
              <div>
                <span className="card-label">REVENUE OVERVIEW</span>
                <h2>Recent Tax Collection</h2>
              </div>

              <span className="card-badge">2026</span>
            </div>

            <div className="collection-total">
              <strong>{formatCurrency(totalCollection)}</strong>
              <span>Total collected</span>
            </div>

            <div className="payment-bars">
              {payments.slice(0, 6).map((payment) => {
                const amount = Number(payment.amount || 0);
                const height = Math.max(
                  (amount / maxPayment) * 100,
                  12
                );

                return (
                  <div className="payment-bar-item" key={payment.paymentId}>
                    <div className="bar-value">
                      {formatCurrency(amount)}
                    </div>

                    <div className="payment-bar-track">
                      <div
                        className="payment-bar-fill"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>

                    <span>
                      {formatDate(payment.paymentDate).split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="dashboard-card status-card">
            <div className="card-header">
              <div>
                <span className="card-label">ASSESSMENT MONITOR</span>
                <h2>Assessment Status</h2>
              </div>
            </div>

            <div className="status-overview">

              <div className="status-circle">
                <div>
                  <strong>{assessments.length}</strong>
                  <span>Total</span>
                </div>
              </div>

              <div className="status-list">

                <div className="status-item">
                  <span>
                    <i className="dot green"></i>
                    Paid
                  </span>
                  <strong>{paidAssessments.length}</strong>
                </div>

                <div className="status-item">
                  <span>
                    <i className="dot orange"></i>
                    Pending
                  </span>
                  <strong>{pendingAssessments.length}</strong>
                </div>

                <div className="status-item">
                  <span>
                    <i className="dot red"></i>
                    Overdue
                  </span>
                  <strong>{overdueAssessments.length}</strong>
                </div>

              </div>
            </div>

            <div className="verification-box">
              <div>
                <span>Property Verification</span>
                <strong>{verifiedProperties.length} verified</strong>
              </div>

              <span className="verification-pending">
                {pendingVerifications.length} pending
              </span>
            </div>
          </section>

        </div>

        {/* RECENT TABLES */}
        <div className="dashboard-two-column">

          <section className="dashboard-card">
            <div className="card-header">
              <div>
                <span className="card-label">TRANSACTIONS</span>
                <h2>Recent Payments</h2>
              </div>

              <button
                className="view-button"
                onClick={() => setActiveMenu("Payments")}
              >
                View All
              </button>
            </div>

            <div className="dashboard-table">
              <table>
                <thead>
                  <tr>
                    <th>Payment</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.slice(0, 5).map((payment) => (
                    <tr key={payment.paymentId}>
                      <td>
                        <div className="table-primary">
                          <span className="table-icon payment">
                            ₹
                          </span>

                          <div>
                            <strong>
                              Payment #{payment.paymentId}
                            </strong>
                            <span>
                              Assessment #{payment.assessmentId}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>{payment.paymentMethod || "Online"}</td>

                      <td>{formatDate(payment.paymentDate)}</td>

                      <td>
                        <strong className="amount-text">
                          {formatCurrency(payment.amount)}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dashboard-card">
            <div className="card-header">
              <div>
                <span className="card-label">CITIZEN SERVICES</span>
                <h2>Recent Complaints</h2>
              </div>

              <button
                className="view-button"
                onClick={() => setActiveMenu("Complaints")}
              >
                View All
              </button>
            </div>

            <div className="complaint-list">

              {complaints.slice(0, 5).map((complaint) => (
                <div
                  className="complaint-item"
                  key={complaint.complaintId}
                >
                  <div className="complaint-number">
                    #{complaint.complaintId}
                  </div>

                  <div className="complaint-content">
                    <strong>{complaint.subject}</strong>

                    <span>
                      Property #{complaint.propertyId} · User #
                      {complaint.userId}
                    </span>
                  </div>

                  <span
                    className={`status-badge ${getStatusClass(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>
              ))}

            </div>
          </section>

        </div>

      </div>
    );
  };

  const renderTablePage = (
    title,
    subtitle,
    count,
    columns,
    rows
  ) => (
    <section className="dashboard-card module-card">

      <div className="module-header">
        <div>
          <span className="card-label">ADMINISTRATION</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="module-total">
          <strong>{count}</strong>
          <span>Records</span>
        </div>
      </div>

      <div className="dashboard-table full-table">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </table>
      </div>

    </section>
  );

  const renderUsers = () =>
    renderTablePage(
      "Registered Users",
      "Manage citizen accounts and system users.",
      users.length,
      [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "created", label: "Created Date" },
      ],
      users.map((user) => (
        <tr key={user.userId}>
          <td>#{user.userId}</td>
          <td>
            <strong>{user.name}</strong>
          </td>
          <td>{user.phoneNumber}</td>
          <td>{user.email}</td>
          <td>
            <span className="status-badge status-neutral">
              {user.role}
            </span>
          </td>
          <td>{formatDate(user.createdAt)}</td>
        </tr>
      ))
    );

  const renderProperties = () =>
    renderTablePage(
      "Properties",
      "Registered property information.",
      properties.length,
      [
        { key: "id", label: "ID" },
        { key: "assessment", label: "Assessment No." },
        { key: "type", label: "Property Type" },
        { key: "usage", label: "Usage" },
        { key: "area", label: "Area" },
        { key: "region", label: "Urban / Rural" },
        { key: "address", label: "Address" },
      ],
      properties.map((property) => (
        <tr key={property.propertyId}>
          <td>#{property.propertyId}</td>
          <td>
            <strong>{property.assessmentNumber}</strong>
          </td>
          <td>{property.propertyType}</td>
          <td>{property.usageType}</td>
          <td>{property.area}</td>
          <td>{property.urbanOrRural}</td>
          <td>{property.address}</td>
        </tr>
      ))
    );

  const renderAssessments = () =>
    renderTablePage(
      "Tax Assessments",
      "Monitor property tax assessment records.",
      assessments.length,
      [
        { key: "id", label: "ID" },
        { key: "year", label: "Tax Year" },
        { key: "property", label: "Property" },
        { key: "value", label: "Taxable Value" },
        { key: "rate", label: "Rate" },
        { key: "amount", label: "Tax Amount" },
        { key: "paid", label: "Paid" },
        { key: "balance", label: "Balance" },
        { key: "due", label: "Due Date" },
        { key: "status", label: "Status" },
      ],
      assessments.map((item) => (
        <tr key={item.assessmentId}>
          <td>#{item.assessmentId}</td>
          <td>{item.taxYear}</td>
          <td>Property #{item.propertyId}</td>
          <td>{formatCurrency(item.taxableValue)}</td>
          <td>{item.taxRate}%</td>
          <td>{formatCurrency(item.taxAmount)}</td>
          <td>{formatCurrency(item.paidAmount)}</td>
          <td>{formatCurrency(item.balanceAmount)}</td>
          <td>{formatDate(item.dueDate)}</td>
          <td>
            <span
              className={`status-badge ${getStatusClass(
                item.status
              )}`}
            >
              {item.status}
            </span>
          </td>
        </tr>
      ))
    );

  const renderTaxRules = () =>
    renderTablePage(
      "Tax Rules",
      "Property tax rate configuration.",
      taxRules.length,
      [
        { key: "id", label: "ID" },
        { key: "region", label: "Urban / Rural" },
        { key: "property", label: "Property Type" },
        { key: "usage", label: "Usage Type" },
        { key: "rate", label: "Rate" },
        { key: "from", label: "Effective From" },
        { key: "to", label: "Effective To" },
      ],
      taxRules.map((rule) => (
        <tr key={rule.ruleId}>
          <td>#{rule.ruleId}</td>
          <td>{rule.urbanOrRural}</td>
          <td>{rule.propertyType}</td>
          <td>{rule.usageType}</td>
          <td>
            <strong>{rule.rate}%</strong>
          </td>
          <td>{formatDate(rule.effectiveFrom)}</td>
          <td>{formatDate(rule.effectiveTo)}</td>
        </tr>
      ))
    );

  const renderPayments = () =>
    renderTablePage(
      "Payments",
      "Property tax payment history.",
      payments.length,
      [
        { key: "id", label: "ID" },
        { key: "assessment", label: "Assessment" },
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount" },
        { key: "method", label: "Method" },
        { key: "reference", label: "Reference" },
        { key: "transaction", label: "Transaction ID" },
        { key: "status", label: "Status" },
      ],
      payments.map((payment) => (
        <tr key={payment.paymentId}>
          <td>#{payment.paymentId}</td>
          <td>#{payment.assessmentId}</td>
          <td>{formatDate(payment.paymentDate)}</td>
          <td>
            <strong>{formatCurrency(payment.amount)}</strong>
          </td>
          <td>{payment.paymentMethod}</td>
          <td>{payment.paymentReference}</td>
          <td>{payment.transactionId || "-"}</td>
          <td>
            <span
              className={`status-badge ${getStatusClass(
                payment.status
              )}`}
            >
              {payment.status}
            </span>
          </td>
        </tr>
      ))
    );

  const renderReceipts = () =>
    renderTablePage(
      "Receipts",
      "Payment receipt records.",
      receipts.length,
      [
        { key: "id", label: "ID" },
        { key: "payment", label: "Payment ID" },
        { key: "number", label: "Receipt Number" },
        { key: "date", label: "Receipt Date" },
        { key: "amount", label: "Amount" },
      ],
      receipts.map((receipt) => (
        <tr key={receipt.receiptId}>
          <td>#{receipt.receiptId}</td>
          <td>#{receipt.paymentId}</td>
          <td>
            <strong>{receipt.receiptNumber}</strong>
          </td>
          <td>{formatDate(receipt.receiptDate)}</td>
          <td>{formatCurrency(receipt.receiptAmount)}</td>
        </tr>
      ))
    );

  const renderComplaints = () =>
    renderTablePage(
      "Citizen Complaints",
      "Manage complaints raised by property owners.",
      complaints.length,
      [
        { key: "id", label: "ID" },
        { key: "subject", label: "Subject" },
        { key: "property", label: "Property" },
        { key: "user", label: "User" },
        { key: "status", label: "Status" },
        { key: "created", label: "Created" },
        { key: "remarks", label: "Admin Remarks" },
      ],
      complaints.map((complaint) => (
        <tr key={complaint.complaintId}>
          <td>#{complaint.complaintId}</td>
          <td>
            <strong>{complaint.subject}</strong>
          </td>
          <td>#{complaint.propertyId}</td>
          <td>#{complaint.userId}</td>
          <td>
            <span
              className={`status-badge ${getStatusClass(
                complaint.status
              )}`}
            >
              {complaint.status}
            </span>
          </td>
          <td>{formatDate(complaint.createdAt)}</td>
          <td>{complaint.adminRemarks || "-"}</td>
        </tr>
      ))
    );

  const renderNotifications = () =>
    renderTablePage(
      "Notifications",
      "Citizen notifications and payment reminders.",
      notifications.length,
      [
        { key: "id", label: "ID" },
        { key: "message", label: "Message" },
        { key: "type", label: "Type" },
        { key: "scheduled", label: "Scheduled" },
        { key: "sent", label: "Sent Date" },
        { key: "status", label: "Status" },
      ],
      notifications.map((notification) => (
        <tr key={notification.notificationId}>
          <td>#{notification.notificationId}</td>
          <td>{notification.message}</td>
          <td>{notification.notificationType}</td>
          <td>{formatDate(notification.scheduledDate)}</td>
          <td>{formatDate(notification.sentDate)}</td>
          <td>
            <span
              className={`status-badge ${getStatusClass(
                notification.status
              )}`}
            >
              {notification.status}
            </span>
          </td>
        </tr>
      ))
    );

  const renderVerification = () => (
    <>
      <div className="summary-grid verification-summary">

        <div className="summary-card">
          <div className="summary-icon success">✓</div>
          <div>
            <span>Verified Properties</span>
            <strong>{verifiedProperties.length}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon warning">!</div>
          <div>
            <span>Pending Verification</span>
            <strong>{pendingVerifications.length}</strong>
          </div>
        </div>

      </div>

      {renderTablePage(
        "Property Verification",
        "Verify registered property details.",
        verifications.length,
        [
          { key: "id", label: "ID" },
          { key: "property", label: "Property ID" },
          { key: "status", label: "Status" },
          { key: "remarks", label: "Remarks" },
          { key: "date", label: "Verified Date" },
        ],
        verifications.map((verification) => (
          <tr key={verification.verificationId}>
            <td>#{verification.verificationId}</td>
            <td>#{verification.propertyId}</td>
            <td>
              <span
                className={`status-badge ${getStatusClass(
                  verification.status
                )}`}
              >
                {verification.status}
              </span>
            </td>
            <td>{verification.remarks || "-"}</td>
            <td>{formatDate(verification.verifiedDate)}</td>
          </tr>
        ))
      )}
    </>
  );

  const renderActivePage = () => {
    switch (activeMenu) {
      case "Users":
        return renderUsers();
      case "Properties":
        return renderProperties();
      case "Tax Assessments":
        return renderAssessments();
      case "Tax Rules":
        return renderTaxRules();
      case "Payments":
        return renderPayments();
      case "Receipts":
        return renderReceipts();
      case "Complaints":
        return renderComplaints();
      case "Notifications":
        return renderNotifications();
      case "Verification":
        return renderVerification();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-page">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="brand-mark">
            PT
          </div>

          <div className="brand-text">
            <strong>Property Tax</strong>
            <span>Government Portal</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-menu-title">
          MAIN MENU
        </div>

        <nav className="admin-navigation">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`sidebar-link ${
                activeMenu === item.name ? "active" : ""
              }`}
              onClick={() => setActiveMenu(item.name)}
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span className="sidebar-link-text">
                {item.name}
              </span>

              {activeMenu === item.name && (
                <span className="sidebar-active-mark"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer"></div>

        <div className="admin-account">
          <div className="account-avatar">
            A
          </div>

          <div className="account-info">
            <strong>Administrator</strong>
            <span>System Admin</span>
          </div>

          <button
            className="account-logout"
            onClick={() => setPage("login")}
            title="Logout"
          >
            ↪
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="admin-main">

        <header className="admin-topbar">

          <div className="topbar-left">
            <span className="topbar-government">
              GOVERNMENT ADMINISTRATION
            </span>

            <span className="topbar-divider">|</span>

            <strong>Property Tax Management System</strong>
          </div>

          <div className="topbar-right">

            <button className="topbar-icon">
              ♢
              {notifications.filter(
                (item) => item.status === "Pending"
              ).length > 0 && (
                <span className="notification-dot"></span>
              )}
            </button>

            <div className="topbar-user">
              <div className="topbar-avatar">A</div>

              <div>
                <strong>Administrator</strong>
                <span>Government Portal</span>
              </div>
            </div>

          </div>

        </header>

        <div className="admin-breadcrumb">
          <span>Home</span>
          <b>/</b>
          <span>Administration</span>
          <b>/</b>
          <strong>{activeMenu}</strong>
        </div>

        <div className="admin-content">
          {renderActivePage()}
        </div>

        <footer className="admin-footer">

          <div>
            <strong>
              Property Tax Collection & Tracking Platform
            </strong>

            <span>
              Tamil Nadu Government Administration Portal
            </span>
          </div>

          <span>
            © 2026 Property Tax Platform
          </span>

        </footer>

      </main>

    </div>
  );
}

export default Admin;