
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const user = {
      name,
      phoneNumber,
      email,
      password
    };

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert("Registration Successful");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      alert("Backend connection failed");
    }
  };

  return (
    <div className="register-page">

      <div className="register-header">
        <div className="logo-circle">PT</div>

        <h1>Create Account</h1>

        <p>
          Register to access the Property Tax Portal
        </p>
      </div>

      <div className="register-form">

        <div className="input-group">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>

          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="login-button"
          onClick={handleRegister}
        >
          Create Account
        </button>

      </div>

      <p className="register-note">
        Your information is used for property tax account management.
      </p>

    </div>
  );
}

export default Register;

