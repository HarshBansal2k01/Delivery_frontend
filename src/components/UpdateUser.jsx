import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UpdateUser() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    pincode: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllUsers();
  }, []);

  const location = useLocation();

  const userId = location.pathname.split("/")[2];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/delete/" + userId, formData);
      alert("User Updated");
      window.location.reload();
    } catch (err) {
      alert("Not Updated");
      console.log(err);
    }
  };
  return (
    <div>
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>
            id: {user.id}, email: {user.email_address}, pincode: {user.pincode},
            phone: {user.phone_no}
          </h3>
        </div>
      ))}
      </div>
      
      <form className="container">
      <h2>Update Details</h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="phone">
            Phone:
          </label>
          <input
            className="form-control"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            pattern="[0-9]{10,15}"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="pincode">
            Pincode:
          </label>
          <input
            className="form-control"
            type="text"
            id="pincode"
            name="pincode"
            pattern="[0-9]{6}"
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={handleClick}>Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
