import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
function Users() {
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

  return (
    <div
      style={{ textAlign: "center", marginTop: "10px", marginBottom: "20px", padding:"20px 20px" }}
    >
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>
            id: {user.id}, email: {user.email_address}, pincode: {user.pincode},
            phone: {user.phone_no}
          </h3>
          <Link to={`/update/${user.id}`}>
            <button>Update</button>
          </Link>
          <Link to={"delete"}>
            <button>Delete</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Users;
