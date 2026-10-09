
import { useState } from "react";
import "./Login.css";

function Login({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/email/${encodeURIComponent(
          email.trim()
        )}`
      );

      if (!response.ok) {
        alert("Invalid email or password");
        return;
      }

      const user = await response.json();

      if (user.password !== password) {
        alert("Invalid email or password");
        return;
      }

      console.log("Logged in user:", user);
      setUser(user);
      alert("Login Successful");

      if (user.role === "Admin") {
        setPage("admin");
      } else {
        setPage("dashboard");
      }
    } catch (error) {
      alert("Backend connection failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-topbar">
        <button
          type="button"
          className="login-brand"
          onClick={() => setPage("home")}
        >
          <span className="login-logo">PT</span>

          <span className="login-brand-name">
            <strong>PROPERTY TAX</strong>
            <small>COLLECTION & TRACKING PORTAL</small>
          </span>
        </button>

        <button
          type="button"
          className="login-home-link"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>
      </header>

      <main className="login-main">
        <section className="login-card">
          <div className="login-card-heading">
            <span className="login-section-label">
              CITIZEN SERVICES PORTAL
            </span>

            <h1>Sign In</h1>

            <p>
              Sign in to your Property Tax Portal
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-password-field">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="login-register-link">
            <span>New user?</span>

            <button
              type="button"
              onClick={() => setPage("register")}
            >
              Create an account
            </button>
          </div>

          <div className="login-secure-note">
            <span></span>
            <span>
              Secure access to your property tax account
            </span>
          </div>
        </section>
      </main>

      <footer className="login-bottom">
        <span>
          Property Tax Collection & Tracking Platform
        </span>

        <span>
          Academic project · Not an official government website
        </span>
      </footer>
    </div>
  );
}

export default Login;
