
import { useState } from "react";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        alert("Invalid email or password");
        return;
      }

      const user = await response.json();

      alert("Login Successful");

      console.log("Logged in user:", user);

      if (user.role === "Admin") {
        setPage("admin");
      } else {
        setPage("dashboard");
      }

    } catch (error) {
      alert("Backend connection failed");
      console.error(error);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo-circle">PT</div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to your Property Tax Portal
        </p>

        <div className="input-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <p className="login-note">
          Secure access to your property tax account
        </p>

      </div>

    </div>
  );
}

export default Login;

