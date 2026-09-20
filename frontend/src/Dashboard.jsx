function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">

        <div className="dashboard-brand">
          <div className="dashboard-logo">
            PT
          </div>

          <div>
            <h1>Property Tax</h1>
            <p>Collection & Tracking Platform</p>
          </div>
        </div>

        <div className="dashboard-user">
          <div className="user-avatar">
            U
          </div>

          <div className="user-details">
            <strong>Property Owner</strong>
            <span>Citizen Account</span>
          </div>
        </div>

      </header>


      {/* Welcome Section */}
      <section className="welcome-section">

        <div>
          <span className="welcome-label">
            PROPERTY TAX PORTAL
          </span>

          <h2>
            Welcome back!
          </h2>

          <p>
            Manage your properties and track your property tax information
            from one place.
          </p>
        </div>

        <div className="portal-info">
          <span>Account Status</span>
          <strong>Active</strong>
        </div>

      </section>


      {/* Summary Cards */}
      <section className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-top">
            <div className="card-icon property-icon">
              🏠
            </div>

            <span className="card-status">
              Registered
            </span>
          </div>

          <div className="card-content">
            <span>Total Properties</span>

            <h3>
              0
            </h3>

            <p>
              Properties registered
            </p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-top">
            <div className="card-icon tax-icon">
              ₹
            </div>

            <span className="card-status">
              Current
            </span>
          </div>

          <div className="card-content">
            <span>Tax Due</span>

            <h3>
              ₹0
            </h3>

            <p>
              Amount pending for payment
            </p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-top">
            <div className="card-icon payment-icon">
              ✓
            </div>

            <span className="card-status">
              Paid
            </span>
          </div>

          <div className="card-content">
            <span>Total Tax Paid</span>

            <h3>
              ₹0
            </h3>

            <p>
              Total payment completed
            </p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-top">
            <div className="card-icon pending-icon">
              !
            </div>

            <span className="card-status">
              Pending
            </span>
          </div>

          <div className="card-content">
            <span>Pending Items</span>

            <h3>
              0
            </h3>

            <p>
              Assessments awaiting action
            </p>
          </div>

        </div>

      </section>


      {/* Main Content */}
      <section className="dashboard-content">


        {/* Property Overview */}
        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span className="panel-label">
                PROPERTY MANAGEMENT
              </span>

              <h2>
                Property Overview
              </h2>

              <p>
                View and manage your registered properties.
              </p>
            </div>

            <div className="panel-icon">
              🏠
            </div>

          </div>


          <div className="empty-state">

            <div className="empty-icon">
              🏠
            </div>

            <h3>
              No properties registered
            </h3>

            <p>
              You have not registered any property yet.
              Register your property to start tracking tax information.
            </p>

          </div>

        </div>


        {/* Tax Summary */}
        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span className="panel-label">
                TAX INFORMATION
              </span>

              <h2>
                Tax Summary
              </h2>

              <p>
                Track your current property tax status.
              </p>
            </div>

            <div className="panel-icon">
              ₹
            </div>

          </div>


          <div className="tax-summary">

            <div className="tax-row">
              <span>Current Tax Due</span>
              <strong>₹0</strong>
            </div>

            <div className="tax-row">
              <span>Last Payment</span>
              <strong>—</strong>
            </div>

            <div className="tax-row">
              <span>Pending Assessments</span>
              <strong>0</strong>
            </div>

            <div className="tax-status-row">
              <span>Overall Status</span>

              <span className="status-badge">
                No Dues
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* Quick Actions */}
      <section className="quick-action-section">

        <div className="section-heading">

          <div>
            <span className="panel-label">
              SERVICES
            </span>

            <h2>
              Quick Actions
            </h2>

            <p>
              Access commonly used property tax services.
            </p>
          </div>

        </div>


        <div className="quick-actions">

          <div className="action-card">

            <div className="action-icon">
              🏠
            </div>

            <div className="action-content">
              <h3>
                Register Property
              </h3>

              <p>
                Add your property details and register a new property.
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>

          </div>


          <div className="action-card">

            <div className="action-icon">
              📄
            </div>

            <div className="action-content">
              <h3>
                Tax Assessment
              </h3>

              <p>
                View your property tax assessment and due information.
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>

          </div>


          <div className="action-card">

            <div className="action-icon">
              💳
            </div>

            <div className="action-content">
              <h3>
                Payment History
              </h3>

              <p>
                View your previous property tax payment records.
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>

          </div>

        </div>

      </section>


      {/* Footer Information */}
      <footer className="dashboard-footer">

        <div>
          <strong>
            Property Tax Collection & Tracking Platform
          </strong>

          <span>
            Centralized Property Tax Management Portal
          </span>
        </div>

        <div className="footer-status">
          <span className="online-dot"></span>
          System Online
        </div>

      </footer>

    </div>
  );
}

export default Dashboard;