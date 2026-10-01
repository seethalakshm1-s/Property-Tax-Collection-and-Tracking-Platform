import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
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
        alert("Login Successful");
        console.log("Logged in user:", user);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      alert("Backend connection failed");
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

export default Login;onwebkitanimationiteration