import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteUser() {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const handleDelete = async (email) => {
    try {
      await axios.delete("http://localhost:8800/delete/" + email);
      alert("User Deleted");
      window.location.reload();
    } catch (err) {
      alert("Not Deleted");
      console.log(err);
    }
  };

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

  return (
    <div
      style={{ textAlign: "center", marginTop: "10px" }}
    >
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id} >
          <h3>
            id: {user.id}, email: {user.email_address}, pincode: {user.pincode},
            phone: {user.phone_no}
          </h3>
        </div>
      ))}
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => handleDelete(email)}>Delete User</button>
    </div>
  );
}

export default DeleteUser;
