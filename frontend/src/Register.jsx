import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password
    };

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.text();

      if (response.ok) {
        alert("Registration Successful");
        setName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
      } else {
        alert("Registration Failed: " + data);
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f7fb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: "420px",
        background: "white",
        padding: "35px",
        borderRadius: "8px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ textAlign: "center", color: "#172b4d" }}>
          Create Account
        </h2>

        <p style={{ textAlign: "center", color: "#748196" }}>
          Register to access the Property Tax Portal
        </p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            style={inputStyle}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            style={inputStyle}
          />

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            style={inputStyle}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create your password"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              background: "#174a7c",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "7px",
  marginBottom: "18px",
  boxSizing: "border-box",
  border: "1px solid #c9d4e2",
  borderRadius: "5px"
};

export default Register;