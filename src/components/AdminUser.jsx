import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminUser() {
  const [selectedType, setSelectedType] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const navigate = useNavigate();

  const handleSelection = (type) => {
    if (type === "admin") {
      setShowPasswordModal(true);
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  const handlePasswordSubmit = () => {

    if (password === "admin123") {
      setIsAdminAuthorized(true);
      setShowPasswordModal(false);

  
      navigate("/updatedelete");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Choose User Type</h2>
      <button
        onClick={() => handleSelection("admin")}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          marginRight: "10px",
        }}
      >
        Admin
      </button>
      <button
        onClick={() => handleSelection("user")}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
      >
        <Link to={"/home"}>User</Link>
      </button>

      {selectedType && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          You selected:{" "}
          <span style={{ fontWeight: "bold" }}>{selectedType}</span>
        </div>
      )}

      {showPasswordModal && (
        <div className="password-modal">
          <div className="password-modal-content">
            <h3>Enter Admin Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handlePasswordSubmit}>Submit</button>
          </div>
        </div>
      )}

      {isAdminAuthorized && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          You are authorized as an admin.
        </div>
      )}
    </div>
  );
}

export default AdminUser;
