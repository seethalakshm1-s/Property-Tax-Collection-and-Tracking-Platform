
import { useEffect, useState } from "react";

function Complaint({ setPage, user }) {
  const [complaints, setComplaints] = useState([]);
  const [properties, setProperties] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const userId = user?.userId ?? user?.user_id;

  const loadData = async () => {
    try {
      const [complaintResponse, propertyResponse] = await Promise.all([
        fetch("http://localhost:8080/api/complaints"),
        fetch("http://localhost:8080/api/properties"),
      ]);

      if (!complaintResponse.ok || !propertyResponse.ok) {
        throw new Error("Could not load complaints or properties");
      }

      const allComplaints = await complaintResponse.json();
      const allProperties = await propertyResponse.json();

      setComplaints(
        allComplaints.filter(
          (item) => Number(item.userId ?? item.user_id) === Number(userId)
        )
      );

      setProperties(
        allProperties.filter(
          (item) => Number(item.userId ?? item.user_id) === Number(userId)
        )
      );
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Could not load complaints or properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !propertyId || !subject.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          description: description.trim(),
          propertyId: Number(propertyId),
          userId: Number(userId),
          status: "Pending",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Complaint submission failed");
      }

      alert("Complaint submitted successfully!");
      setSubject("");
      setDescription("");
      setPropertyId("");
      setLoading(true);
      await loadData();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Could not submit complaint. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const cellStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "left",
  };

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={() => setPage("dashboard")}>
        Back to Dashboard
      </button>

      <h2>Submit a Complaint</h2>
      <p>Report an issue related to your property tax.</p>

      {!userId ? (
        <p>Please log in again to submit a complaint.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            display: "grid",
            gap: "12px",
            margin: "20px 0 30px",
          }}
        >
          <label htmlFor="complaint-property">Your Property</label>
          <select
            id="complaint-property"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            required
          >
            <option value="">Select your property</option>
            {properties.map((property) => (
              <option key={property.propertyId ?? property.property_id}
                value={property.propertyId ?? property.property_id}>
                {property.assessmentNumber ?? property.assessment_number}
                {" — "}
                {property.address}
              </option>
            ))}
          </select>

          <label htmlFor="complaint-subject">Subject</label>
          <input
            id="complaint-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={150}
            placeholder="Enter complaint subject"
            required
          />

          <label htmlFor="complaint-description">Description</label>
          <textarea
            id="complaint-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={4}
            placeholder="Explain your issue"
            required
          />

          <button type="submit" disabled={submitting || loading}>
            {submitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      )}

      <h2>My Complaints</h2>

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints submitted by you yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Subject</th>
                <th style={cellStyle}>Description</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Property ID</th>
                <th style={cellStyle}>Admin Remarks</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.complaintId ?? complaint.complaint_id}>
                  <td style={cellStyle}>
                    {complaint.complaintId ?? complaint.complaint_id}
                  </td>
                  <td style={cellStyle}>{complaint.subject}</td>
                  <td style={cellStyle}>{complaint.description}</td>
                  <td style={cellStyle}>{complaint.status}</td>
                  <td style={cellStyle}>
                    {complaint.propertyId ?? complaint.property_id}
                  </td>
                  <td style={cellStyle}>
                    {complaint.adminRemarks ?? complaint.admin_remarks ?? "Not updated"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Complaint;
