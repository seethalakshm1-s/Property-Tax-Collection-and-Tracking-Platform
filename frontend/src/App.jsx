import { useState } from "react";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Property from "./Property";
import Tax from "./Tax";
import Payment from "./Payment";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

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

  if (page === "register") {
    return <Register setPage={setPage} />;
  }
  if (page === "dashboard") {
    return <Dashboard setPage={setPage} />;
  }

  if (page === "property") {
      return <Property setPage={setPage} />;
  }
  if (page === "tax") {
    return <Tax setPage={setPage} />;
}
  if (page === "payment") {
  return <Payment setPage={setPage} />;
}
  return (
    <div className="login-page">

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
                    alert(
                      "Please contact the administrator to reset your password."
                    )
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