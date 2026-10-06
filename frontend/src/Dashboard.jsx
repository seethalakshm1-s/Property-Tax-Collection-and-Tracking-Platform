import { useEffect, useState } from "react";

function Dashboard({ setPage, user }) {
  const [properties, setProperties] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Property API Error:", error));

    fetch("http://localhost:8080/api/tax-assessments")
      .then((res) => res.json())
      .then((data) => setAssessments(data))
      .catch((error) => console.error("Tax API Error:", error));

    fetch("http://localhost:8080/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Payment API Error:", error));
  }, []);

  const userProperties = properties.filter(
  (property) => property.userId === user?.userId
);

const userAssessments = assessments.filter((assessment) =>
  userProperties.some(
    (property) => property.propertyId === assessment.propertyId
  )
);

const totalProperties = userProperties.length;

const totalTaxDue = userAssessments.reduce(
  (total, item) => total + Number(item.balanceAmount || 0),
  0
);
 const userPayments = payments.filter((payment) =>
  userAssessments.some(
    (assessment) => assessment.assessmentId === payment.assessmentId
  )
);

const totalTaxPaid = userPayments.reduce(
  (total, item) => total + Number(item.amount || 0),
  0
);

  const pendingAssessments = userAssessments.filter(
    (item) =>
      item.status === "Pending" ||
      item.status === "Partial" ||
      Number(item.balanceAmount || 0) > 0
  ).length;

  const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  const latestAssessment = userAssessments.length
    ? [...userAssessments].sort(
        (a, b) =>
          new Date(b.dueDate || "1900-01-01") -
          new Date(a.dueDate || "1900-01-01")
      )[0]
    : null;

    const latestPayment = userPayments.length
  ? [...userPayments].sort(
        (a, b) =>
          new Date(b.paymentDate || "1900-01-01") -
          new Date(a.paymentDate || "1900-01-01")
      )[0]
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily:
          "Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
        color: "#172033",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e4e9f0",
          padding: "18px 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "10px",
              background: "#123b6d",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "17px",
              letterSpacing: "0.5px",
            }}
          >
            PT
          </div>

          <div>
            <div
              style={{
                fontSize: "19px",
                fontWeight: "750",
                color: "#123b6d",
                lineHeight: "1.2",
              }}
            >
              Property Tax
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#718096",
                marginTop: "3px",
              }}
            >
              Collection & Tracking Platform
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
          }}
        >
                   <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#eaf1f8",
              color: "#123b6d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
            }}
          >
            U
          </div>

          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {user?.name || "Property Owner"}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#7b8798",
                marginTop: "2px",
              }}
            >
              Citizen Account
            </div>
          </div>
        </div>
      </header>

      <main
        style={{
          width: "88%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "36px 0 45px",
        }}
      >
        {/* Welcome Banner */}
        <section
          style={{
            background:
              "linear-gradient(120deg, #123b6d 0%, #1d568f 100%)",
            borderRadius: "16px",
            padding: "34px 38px",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
            marginBottom: "28px",
            boxShadow: "0 8px 25px rgba(18,59,109,0.12)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                fontWeight: "700",
                opacity: 0.75,
                marginBottom: "10px",
              }}
            >
              CITIZEN PROPERTY TAX PORTAL
            </div>

 <h1
  style={{
    margin: 0,
    fontSize: "30px",
    fontWeight: "750",
  }}
>
  Welcome back, {user?.name || "Citizen"}!
</h1>

            <p
              style={{
                margin: "10px 0 0",
                fontSize: "14px",
                lineHeight: "1.6",
                opacity: 0.88,
                maxWidth: "650px",
              }}
            >
              Manage your registered properties, view tax assessments and
              monitor your payment information from one place.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "12px",
              padding: "17px 22px",
              minWidth: "145px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                opacity: 0.75,
                marginBottom: "6px",
              }}
            >
              ACCOUNT STATUS
            </div>

            <div
              style={{
                fontSize: "15px",
                fontWeight: "700",
              }}
            >
              ● Active
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "18px",
            marginBottom: "30px",
          }}
        >
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span style={labelStyle}>MY PROPERTIES</span>

              <div style={iconStyle("#eaf2fb", "#19558c")}>⌂</div>
            </div>

            <div style={numberStyle}>{totalProperties}</div>

            <div style={descriptionStyle}>Registered properties</div>

            <div style={bottomLineStyle}>
              <span style={{ color: "#1d6f42" }}>● Active records</span>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span style={labelStyle}>TAX DUE</span>

              <div style={iconStyle("#fff5df", "#a66a00")}>₹</div>
            </div>

            <div style={numberStyle}>{formatCurrency(totalTaxDue)}</div>

            <div style={descriptionStyle}>Outstanding tax balance</div>

            <div style={bottomLineStyle}>
              <span style={{ color: "#a66a00" }}>
                {pendingAssessments} pending assessment
                {pendingAssessments !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span style={labelStyle}>TOTAL PAID</span>

              <div style={iconStyle("#e9f7ef", "#1d7547")}>✓</div>
            </div>

            <div style={numberStyle}>{formatCurrency(totalTaxPaid)}</div>

            <div style={descriptionStyle}>Recorded payment amount</div>

            <div style={bottomLineStyle}>
              <span style={{ color: "#1d7547" }}>
                {userPayments.length} successful payment
                {userPayments.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span style={labelStyle}>ASSESSMENTS</span>

              <div style={iconStyle("#f2edff", "#6941a5")}>▣</div>
            </div>

            <div style={numberStyle}>{userAssessments.length}</div>

            <div style={descriptionStyle}>Tax assessments available</div>

            <div style={bottomLineStyle}>
              <span style={{ color: "#6941a5" }}>
                {latestAssessment?.status || "No data"}
              </span>
            </div>
          </div>
        </section>

        {/* Main Panels */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 1fr",
            gap: "22px",
            marginBottom: "30px",
          }}
        >
          {/* Property Panel */}
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <div>
                <div style={sectionLabelStyle}>PROPERTY MANAGEMENT</div>

                <h2 style={sectionTitleStyle}>My Properties</h2>

                <p style={sectionDescriptionStyle}>
                  View and manage your registered property information.
                </p>
              </div>

              <button
                onClick={() => setPage("property")}
                style={primaryButtonStyle}
              >
                + Register Property
              </button>
            </div>

           {userProperties.length > 0 ? (
              <div
                style={{
                  marginTop: "20px",
                  border: "1px solid #e5eaf0",
                  borderRadius: "11px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr 0.8fr",
                    padding: "13px 16px",
                    background: "#f8fafc",
                    color: "#718096",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.6px",
                  }}
                >
                  <span>ASSESSMENT NUMBER</span>
                  <span>PROPERTY TYPE</span>
                  <span>LOCATION</span>
                </div>

                {properties.slice(0, 3).map((property) => (
                  <div
                    key={property.propertyId}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr 0.8fr",
                      padding: "15px 16px",
                      borderTop: "1px solid #edf0f4",
                      fontSize: "13px",
                      alignItems: "center",
                    }}
                  >
                    <strong style={{ color: "#173f70" }}>
                      {property.assessmentNumber}
                    </strong>

                    <span>
                      {property.propertyType || "—"}
                    </span>

                    <span style={{ color: "#667085" }}>
                      {property.urbanOrRural || "—"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={emptyStyle}>
                <div style={{ fontSize: "34px", marginBottom: "10px" }}>
                  ⌂
                </div>

                <strong>No properties registered</strong>

                <p>
                  Register your property to start tracking tax information.
                </p>
              </div>
            )}
          </div>

          {/* Tax Panel */}
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <div>
                <div style={sectionLabelStyle}>TAX INFORMATION</div>

                <h2 style={sectionTitleStyle}>Tax Summary</h2>

                <p style={sectionDescriptionStyle}>
                  Current assessment and payment information.
                </p>
              </div>

              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "#eef4fb",
                  color: "#174d7f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "18px",
                }}
              >
                ₹
              </div>
            </div>

            <div style={{ marginTop: "22px" }}>
              <div style={taxRowStyle}>
                <span>Current Tax Due</span>
                <strong>{formatCurrency(totalTaxDue)}</strong>
              </div>

              <div style={taxRowStyle}>
                <span>Last Payment</span>
                <strong>
                  {latestPayment
                    ? formatCurrency(latestPayment.amount)
                    : "—"}
                </strong>
              </div>

              <div style={taxRowStyle}>
                <span>Pending Assessments</span>
                <strong>{pendingAssessments}</strong>
              </div>

              <div
                style={{
                  ...taxRowStyle,
                  borderBottom: "none",
                  paddingBottom: 0,
                }}
              >
                <span>Overall Status</span>

                <span
                  style={{
                    background:
                      totalTaxDue > 0 ? "#fff4df" : "#eaf7ef",
                    color: totalTaxDue > 0 ? "#9a6100" : "#1d7044",
                    padding: "6px 11px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  {totalTaxDue > 0 ? "Dues Pending" : "No Dues"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setPage("tax")}
              style={secondaryButtonStyle}
            >
              View Tax Assessments →
            </button>
          </div>
        </section>

        {/* Services */}
        <section style={panelStyle}>
          <div style={{ marginBottom: "22px" }}>
            <div style={sectionLabelStyle}>CITIZEN SERVICES</div>

            <h2 style={sectionTitleStyle}>Quick Actions</h2>

            <p style={sectionDescriptionStyle}>
              Access commonly used property tax services.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
            }}
          >
            <ServiceCard
              icon="⌂"
              title="Register Property"
              description="Add a new property to your citizen account."
              onClick={() => setPage("property")}
            />

            <ServiceCard
              icon="₹"
              title="Tax Assessment"
              description="View assessment details, tax amount and due date."
              onClick={() => setPage("tax")}
            />

            <ServiceCard
              icon="▣"
              title="Payment History"
              description="View your completed property tax payments."
              onClick={() => setPage("payment")}
            />
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #dfe5ec",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#7a8797",
            fontSize: "12px",
          }}
        >
          <div>
            <strong style={{ color: "#526173" }}>
              Property Tax Collection & Tracking Platform
            </strong>

            <div style={{ marginTop: "4px" }}>
              Centralized Property Tax Management Portal
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: "#24a148",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
            System Online
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ---------- Reusable Styles ---------- */

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e4e9f0",
  borderRadius: "13px",
  padding: "20px",
  minHeight: "155px",
  boxSizing: "border-box",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const labelStyle = {
  fontSize: "10px",
  fontWeight: "800",
  color: "#7a8797",
  letterSpacing: "0.9px",
};

const iconStyle = (background, color) => ({
  width: "36px",
  height: "36px",
  borderRadius: "9px",
  background,
  color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  fontSize: "16px",
});

const numberStyle = {
  marginTop: "17px",
  fontSize: "25px",
  fontWeight: "750",
  color: "#172033",
};

const descriptionStyle = {
  marginTop: "5px",
  color: "#7a8797",
  fontSize: "12px",
};

const bottomLineStyle = {
  marginTop: "13px",
  paddingTop: "11px",
  borderTop: "1px solid #edf0f4",
  fontSize: "11px",
  fontWeight: "600",
};

const panelStyle = {
  background: "#ffffff",
  border: "1px solid #e3e8ef",
  borderRadius: "14px",
  padding: "25px",
  boxSizing: "border-box",
};

const panelHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "15px",
};

const sectionLabelStyle = {
  fontSize: "10px",
  color: "#55708e",
  fontWeight: "800",
  letterSpacing: "1px",
  marginBottom: "7px",
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: "21px",
  color: "#172033",
  fontWeight: "750",
};

const sectionDescriptionStyle = {
  margin: "6px 0 0",
  color: "#7a8797",
  fontSize: "12px",
};

const primaryButtonStyle = {
  border: "none",
  background: "#123b6d",
  color: "#ffffff",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const secondaryButtonStyle = {
  width: "100%",
  marginTop: "22px",
  border: "1px solid #cbd6e2",
  background: "#ffffff",
  color: "#174d7f",
  padding: "11px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const emptyStyle = {
  marginTop: "20px",
  padding: "30px",
  textAlign: "center",
  border: "1px dashed #ccd5df",
  borderRadius: "10px",
  color: "#64748b",
  background: "#fafbfd",
};

const taxRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid #edf0f4",
  fontSize: "13px",
  color: "#657285",
};

function ServiceCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "11px",
        padding: "18px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        cursor: "pointer",
        background: "#ffffff",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          minWidth: "42px",
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          background: "#edf4fb",
          color: "#174d7f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "800",
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <h3
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#1d2a3a",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "11px",
            lineHeight: "1.5",
            color: "#7a8797",
          }}
        >
          {description}
        </p>
      </div>

      <span
        style={{
          color: "#7890a8",
          fontSize: "18px",
        }}
      >
        →
      </span>
    </div>
  );
}

export default Dashboard;