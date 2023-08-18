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
    <div className="container mt-3" style={{ textAlign: "center" }}>
      <h2 className="mb-3">Choose User Type</h2>
      <button
        onClick={() => handleSelection("admin")}
        className="btn btn-dark mb-3"
      >
        Admin
      </button>
      <button
        onClick={() => handleSelection("user")}
        className="btn btn-warning mb-3 ms-2"
       
      >
        <Link  style={{ textDecoration: "none" , color:"black"}} to={"/home"}>User</Link>
      </button>

      <div className="mb-3">
        {selectedType && (
          <div style={{ marginTop: "20px", fontSize: "18px" }}>
            You selected:{" "}
            <span style={{ fontWeight: "bold" }}>{selectedType}</span>
          </div>
        )}
        <div>
          {showPasswordModal && (
            <div>
              <h3>Enter Admin Password</h3>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-info" onClick={handlePasswordSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>

        {isAdminAuthorized && (
          <div style={{ marginTop: "20px", fontSize: "18px" }}>
            You are authorized as an admin.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUser;
