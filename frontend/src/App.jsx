
import { useState } from "react";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Property from "./Property";

function App() {
  const [page, setPage] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users");

      if (!response.ok) {
        alert("Unable to connect to backend");
        return;
      }

      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        setPage("dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      alert("Backend connection failed");
    }
  };

  /* =========================
     REGISTER
  ========================= */

  if (page === "register") {
    return (
      <div className="app-page">
        <div className="form-card">

          <Register />

          <button
            className="back-button"
            onClick={() => setPage("login")}
          >
            Back to Login
          </button>

        </div>
      </div>
    );
  }

  /* =========================
     DASHBOARD
  ========================= */

  if (page === "dashboard") {
    return (
      <div className="app-page">

        <Dashboard />

        <div className="dashboard-actions">

          <button
            className="primary-button"
            onClick={() => setPage("property")}
          >
            Register Property
          </button>

          <button
            className="secondary-button"
            onClick={() => setPage("login")}
          >
            Logout
          </button>

        </div>

      </div>
    );
  }

  /* =========================
     PROPERTY
  ========================= */

  if (page === "property") {
    return (
      <div className="app-page">

        <div className="form-card">

          <Property />

          <button
            className="back-button"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  /* =========================
     LOGIN PAGE
  ========================= */

  return (
    <div className="login-page">

      {/* Header */}

      <header className="portal-header">

        <div className="portal-brand">

          <div className="portal-logo">
            PT
          </div>

          <div>
            <h1>Property Tax</h1>
            <span>Collection & Tracking Platform</span>
          </div>

        </div>

        <div className="header-status">
          Online Portal
        </div>

      </header>

      {/* Login Section */}

      <main className="login-main">

        <div className="login-card">

          <div className="login-card-header">

            <div className="login-symbol">
              PT
            </div>

            <h2>Sign in to your account</h2>

            <p>
              Access your property tax information securely
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    alert("Please contact the administrator to reset your password.")
                  }
                >
                  Forgot Password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            <button
              type="submit"
              className="sign-in-button"
            >
              Sign In
            </button>

          </form>

          <div className="register-area">

            <span>
              Don't have an account?
            </span>

            <button
              onClick={() => setPage("register")}
            >
              Create Account
            </button>

          </div>

          <div className="security-message">
            Your information is protected and securely managed.
          </div>

        </div>

      </main>

      {/* Footer */}

      <footer className="portal-footer">

        <span>
          Property Tax Collection & Tracking Platform
        </span>

        <span>
          © 2026
        </span>

      </footer>

    </div>
  );
}

export default App;

