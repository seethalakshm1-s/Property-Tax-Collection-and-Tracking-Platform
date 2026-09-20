import { useState } from "react";

function Property() {
  const [assessmentNumber, setAssessmentNumber] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [usageType, setUsageType] = useState("");
  const [area, setArea] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [urbanOrRural, setUrbanOrRural] = useState("");

  const handleAddProperty = async () => {
    const property = {
      assessmentNumber,
      propertyType,
      usageType,
      area: Number(area),
      doorNumber,
      street,
      address,
      urbanOrRural
    };

    try {
      const response = await fetch("http://localhost:8080/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
      });

      if (response.ok) {
        alert("Property Added Successfully");
      } else {
        alert("Failed to Add Property");
      }
    } catch (error) {
      alert("Backend connection failed");
    }
  };

  return (
    <div className="property-form">

      <div className="logo-circle">PT</div>

      <h1>Property Registration</h1>

      <p className="subtitle">
        Register your property for tax collection and tracking
      </p>

      <div className="form-grid">

        <input
          type="text"
          placeholder="Assessment Number"
          value={assessmentNumber}
          onChange={(e) => setAssessmentNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Door Number"
          value={doorNumber}
          onChange={(e) => setDoorNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Property Type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        />

        <input
          type="text"
          placeholder="Usage Type"
          value={usageType}
          onChange={(e) => setUsageType(e.target.value)}
        />

        <input
          type="number"
          placeholder="Area (sq.ft)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <select
          value={urbanOrRural}
          onChange={(e) => setUrbanOrRural(e.target.value)}
        >
          <option value="">Select Location Type</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>

      </div>

      <input
        className="full-input"
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <textarea
        placeholder="Complete Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        className="login-button"
        onClick={handleAddProperty}
      >
        Register Property
      </button>

    </div>
  );
}

export default Property;