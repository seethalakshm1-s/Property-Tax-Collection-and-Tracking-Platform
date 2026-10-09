
import "./Home.css";

function Home({ setPage }) {
  const services = [
    {
      number: "01",
      icon: "₹",
      title: "Check Tax Dues",
      description:
        "View your property tax assessment, outstanding balance and payment due date.",
      action: "Check dues",
    },
    {
      number: "02",
      icon: "↗",
      title: "Pay Property Tax",
      description:
        "Access your tax assessment and proceed to the available payment services.",
      action: "View payment services",
    },
    {
      number: "03",
      icon: "▤",
      title: "Receipts & History",
      description:
        "Review previous payments and access your payment records and receipts.",
      action: "View records",
    },
    {
      number: "04",
      icon: "⌂",
      title: "Property Details",
      description:
        "View registered property information and related assessment details.",
      action: "View properties",
    },
  ];

  return (
    <div className="home-page" id="home">
      <div className="portal-topbar">
        <div className="home-container portal-topbar-inner">
          <span>PROPERTY TAX COLLECTION & TRACKING PLATFORM</span>
          <span className="topbar-right">
            <span className="topbar-dot"></span>
            Citizen Service Portal
          </span>
        </div>
      </div>

      <header className="home-header">
        <div className="home-container header-inner">
          <a className="home-brand" href="#home" aria-label="Portal home">
            <div className="brand-symbol">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 21L24 6L43 21"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 20V40H38V20M19 40V28H29V40M16 23H20M28 23H32"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="brand-copy">
              <strong>PROPERTY TAX</strong>
              <span>Collection & Tracking Platform</span>
            </div>
          </a>

          <nav className="home-nav" aria-label="Main navigation">
            <a className="nav-link active" href="#home">
              Home
            </a>
            <a className="nav-link" href="#about">
              About
            </a>
            <a className="nav-link" href="#services">
              Services
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </nav>

          <div className="header-actions">
            <button
              className="button button-login"
              onClick={() => setPage("login")}
            >
              Login
            </button>
            <button
              className="button button-register"
              onClick={() => setPage("register")}
            >
              Register <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="home-hero" id="about">
          <div className="hero-pattern"></div>
          <div className="home-container hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="eyebrow-line"></span>
                DIGITAL CITIZEN SERVICES
              </div>

              <h1>
                Property tax management,
                <span> made convenient.</span>
              </h1>

              <p className="hero-description">
                A digital platform to access property details, review tax
                assessments, track dues and manage your property tax records.
              </p>

              <div className="hero-actions">
                <button
                  className="button hero-primary"
                  onClick={() => setPage("login")}
                >
                  Access Citizen Portal <span aria-hidden="true">→</span>
                </button>
                <a className="hero-secondary" href="#services">
                  Explore services <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="hero-note">
                <span className="note-check">✓</span>
                <span>Convenient access to urban and rural property services</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-accent visual-accent-one"></div>
              <div className="visual-accent visual-accent-two"></div>

              <div className="portal-preview">
                <div className="preview-header">
                  <div>
                    <span className="preview-overline">CITIZEN PORTAL</span>
                    <h2>Property overview</h2>
                  </div>
                  <div className="preview-building">⌂</div>
                </div>

                <div className="preview-welcome">
                  <span>Your property, your records</span>
                  <span className="preview-status">
                    <span></span> Digital access
                  </span>
                </div>

                <div className="preview-main-card">
                  <div className="preview-card-top">
                    <span>PROPERTY TAX</span>
                    <span className="preview-mini-icon">₹</span>
                  </div>
                  <div className="preview-card-title">
                    Manage your tax details
                  </div>
                  <p>Assessment, dues and payment information in one dashboard.</p>
                  <div className="preview-card-line"></div>
                  <div className="preview-card-bottom">
                    <span>Citizen account</span>
                    <span>View details →</span>
                  </div>
                </div>

                <div className="preview-services">
                  <div className="preview-service-row">
                    <div className="preview-service-icon blue-icon">₹</div>
                    <div>
                      <strong>Tax assessment</strong>
                      <span>View dues and tax details</span>
                    </div>
                    <span className="preview-arrow">→</span>
                  </div>
                  <div className="preview-service-row">
                    <div className="preview-service-icon sky-icon">▤</div>
                    <div>
                      <strong>Payment records</strong>
                      <span>History and receipts</span>
                    </div>
                    <span className="preview-arrow">→</span>
                  </div>
                </div>
              </div>

              <div className="floating-label">
                <span className="floating-label-icon">✓</span>
                <div>
                  <strong>One convenient portal</strong>
                  <span>Access your property services</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="service-strip">
          <div className="home-container service-strip-inner">
            <div className="strip-item">
              <div className="strip-icon">01</div>
              <div>
                <strong>Property Information</strong>
                <span>Access registered details</span>
              </div>
            </div>
            <div className="strip-item">
              <div className="strip-icon">02</div>
              <div>
                <strong>Tax Assessment</strong>
                <span>Review tax and due dates</span>
              </div>
            </div>
            <div className="strip-item">
              <div className="strip-icon">03</div>
              <div>
                <strong>Payment Records</strong>
                <span>Track payments and receipts</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-services section-space" id="services">
          <div className="home-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">CITIZEN SERVICES</span>
                <h2>How can we help you?</h2>
                <p>
                  Choose a service to access your property tax information and
                  account.
                </p>
              </div>
              <button
                className="text-action"
                onClick={() => setPage("login")}
              >
                Access all services <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="service-card-grid">
              {services.map((service) => (
                <button
                  className="service-card"
                  key={service.number}
                  onClick={() => setPage("login")}
                >
                  <div className="service-card-top">
                    <div className={`service-icon service-icon-${service.number}`}>
                      {service.icon}
                    </div>
                    <span className="service-number">{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-card-action">
                    {service.action} <span aria-hidden="true">→</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="property-types">
          <div className="home-container">
            <div className="property-heading">
              <span className="section-kicker">PROPERTY SERVICES</span>
              <h2>Services for urban and rural properties</h2>
              <p>
                Choose the property category that applies to your local body.
              </p>
            </div>

            <div className="property-type-grid">
              <article className="property-type-card urban-card">
                <div className="property-type-art urban-art">
                  <svg
                    viewBox="0 0 120 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 88V37H43V88M43 88V16H77V88M77 88V48H105V88" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M25 49H33M25 62H33M25 75H33M53 29H61M53 42H61M53 55H61M53 68H61M87 60H95M87 73H95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M7 89H113" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="property-type-copy">
                  <span className="property-label">URBAN LOCAL BODIES</span>
                  <h3>Urban Property Tax</h3>
                  <p>
                    Property tax services for eligible urban local body
                    properties.
                  </p>
                  <button
                    className="property-type-link"
                    onClick={() => setPage("login")}
                  >
                    Continue to portal <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>

              <article className="property-type-card rural-card">
                <div className="property-type-art rural-art">
                  <svg
                    viewBox="0 0 120 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 47L60 12L108 47" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 43V89H97V43M49 89V59H71V89" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M8 90H112" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M31 54H40M80 54H89" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="property-type-copy">
                  <span className="property-label">RURAL LOCAL BODIES</span>
                  <h3>Rural Property Tax</h3>
                  <p>
                    Property tax services for eligible rural local body
                    properties.
                  </p>
                  <button
                    className="property-type-link"
                    onClick={() => setPage("login")}
                  >
                    Continue to portal <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-container cta-inner">
            <div>
              <span className="cta-kicker">GET STARTED</span>
              <h2>Manage your property tax account online.</h2>
              <p>
                Sign in to view your property details, assessments and payment
                records.
              </p>
            </div>
            <div className="cta-actions">
              <button
                className="button cta-signin"
                onClick={() => setPage("login")}
              >
                Login to your account
              </button>
              <button
                className="button cta-register"
                onClick={() => setPage("register")}
              >
                Create an account →
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer" id="contact">
        <div className="home-container footer-main">
          <a className="home-brand footer-brand" href="#home">
            <div className="brand-symbol">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 21L24 6L43 21"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 20V40H38V20M19 40V28H29V40"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="brand-copy">
              <strong>PROPERTY TAX</strong>
              <span>Collection & Tracking Platform</span>
            </div>
          </a>
          <div className="footer-description">
            A digital platform concept for managing property tax information,
            assessments and payment records.
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <button onClick={() => setPage("login")}>Citizen Login</button>
          </div>
        </div>
        <div className="home-container footer-bottom">
          <span>Property Tax Collection & Tracking Platform</span>
          <span>Academic project • Not an official government website</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;