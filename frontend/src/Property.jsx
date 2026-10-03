import { useState } from "react";

function Property({ setPage }) {
  const [formData, setFormData] = useState({
    assessmentNumber: "",
    propertyType: "",
    usageType: "",
    area: "",
    doorNumber: "",
    street: "",
    address: "",
    urbanOrRural: "",
    registrationDate: "",
    userId: "",
    locationId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.assessmentNumber ||
      !formData.propertyType ||
      !formData.usageType ||
      !formData.area ||
      !formData.doorNumber ||
      !formData.street ||
      !formData.address ||
      !formData.urbanOrRural ||
      !formData.registrationDate ||
      !formData.userId ||
      !formData.locationId
    ) {
      alert("Please fill all property details");
      return;
    }

    setLoading(true);

    const propertyData = {
      assessmentNumber: formData.assessmentNumber,
      propertyType: formData.propertyType,
      usageType: formData.usageType,
      area: Number(formData.area),
      doorNumber: formData.doorNumber,
      street: formData.street,
      address: formData.address,
      urbanOrRural: formData.urbanOrRural,
      registrationDate: formData.registrationDate,
      userId: Number(formData.userId),
      locationId: Number(formData.locationId),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/properties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(propertyData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Property registered successfully!");

      setFormData({
        assessmentNumber: "",
        propertyType: "",
        usageType: "",
        area: "",
        doorNumber: "",
        street: "",
        address: "",
        urbanOrRural: "",
        registrationDate: "",
        userId: "",
        locationId: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to register property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-page">
      <div className="property-container">

        <div className="property-header">
          <div>
            <h1>Add Property</h1>
            <p>
              Enter your property details to register it in the Property Tax
              Portal.
            </p>
          </div>

          <button
            type="button"
            className="property-list-button"
            onClick={() => setPage("dashboard")}
          >
            My Properties
          </button>
        </div>

        <div className="property-card">
          <div className="section-title">
            <h2>Property Details</h2>
            <p>Enter the basic information of your property.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Assessment Number</label>
                <input
                  type="text"
                  name="assessmentNumber"
                  value={formData.assessmentNumber}
                  onChange={handleChange}
                  placeholder="Example: TN-CBE-10006"
                />
              </div>

              <div className="form-group">
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="">Select Property Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="form-group">
                <label>Usage Type</label>
                <select
                  name="usageType"
                  value={formData.usageType}
                  onChange={handleChange}
                >
                  <option value="">Select Usage Type</option>
                  <option value="Self Occupied">Self Occupied</option>
                  <option value="Rental">Rental</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="form-group">
                <label>Area (sq.ft)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Example: 1250"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Door Number</label>
                <input
                  type="text"
                  name="doorNumber"
                  value={formData.doorNumber}
                  onChange={handleChange}
                  placeholder="Example: 12A"
                />
              </div>

              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Example: Mettupalayam Road"
                />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Example: Saibaba Colony, Coimbatore"
                />
              </div>

              <div className="form-group">
                <label>Urban / Rural</label>
                <select
                  name="urbanOrRural"
                  value={formData.urbanOrRural}
                  onChange={handleChange}
                >
                  <option value="">Select Area Type</option>
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

              <div className="form-group">
                <label>Registration Date</label>
                <input
                  type="date"
                  name="registrationDate"
                  value={formData.registrationDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>User ID</label>
                <input
                  type="number"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="Example: 1"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Location ID</label>
                <input
                  type="number"
                  name="locationId"
                  value={formData.locationId}
                  onChange={handleChange}
                  placeholder="Example: 1"
                  min="1"
                />
              </div>

            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setPage("dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Property"}
              </button>
            </div>

          </form>
        </div>

        <div className="property-note">
          <strong>Property Tax Portal</strong>
          <span>
            Make sure all property information is entered correctly before
            submitting.
          </span>
        </div>

      </div>

      <style>{`
        .property-page {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 40px 20px;
          box-sizing: border-box;
        }

        .property-container {
          max-width: 1050px;
          margin: 0 auto;
        }

        .property-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .property-header h1 {
          margin: 0 0 8px;
          color: #172b4d;
          font-size: 30px;
        }

        .property-header p {
          margin: 0;
          color: #6b7280;
          font-size: 15px;
        }

        .property-list-button {
          padding: 11px 18px;
          border: 1px solid #174a7c;
          border-radius: 6px;
          background: white;
          color: #174a7c;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .property-list-button:hover {
          background: #f0f5fa;
        }

        .property-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 32px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .section-title {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 18px;
          margin-bottom: 25px;
        }

        .section-title h2 {
          margin: 0 0 6px;
          color: #172b4d;
          font-size: 21px;
        }

        .section-title p {
          margin: 0;
          color: #7b8794;
          font-size: 14px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-group label {
          margin-bottom: 8px;
          color: #374151;
          font-size: 14px;
          font-weight: 600;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 13px;
          box-sizing: border-box;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          background: #ffffff;
          color: #1f2937;
          font-size: 14px;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #174a7c;
          box-shadow: 0 0 0 2px rgba(23, 74, 124, 0.08);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 30px;
          padding-top: 22px;
          border-top: 1px solid #e5e7eb;
        }

        .cancel-button {
          padding: 12px 22px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          background: white;
          color: #374151;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel-button:hover {
          background: #f8fafc;
        }

        .submit-button {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          background: #174a7c;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .submit-button:hover {
          background: #123d66;
        }

        .submit-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .property-note {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 18px;
          padding: 15px 18px;
          border: 1px solid #e2e8f0;
          border-radius: 7px;
          background: #ffffff;
          color: #6b7280;
          font-size: 13px;
        }

        .property-note strong {
          color: #374151;
        }

        @media (max-width: 700px) {
          .property-page {
            padding: 25px 15px;
          }

          .property-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .property-card {
            padding: 22px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: span 1;
          }

          .form-actions {
            flex-direction: column;
          }

          .cancel-button,
          .submit-button {
            width: 100%;
          }

          .property-note {
            flex-direction: column;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}

export default Property;