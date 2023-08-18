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
    <div className="container">
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>
            id: {user.id}, email: {user.email_address}, pincode: {user.pincode},
            phone: {user.phone_no}
          </h3>
        </div>
      ))}

      <form>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <button
          type="submit"
          onClick={() => handleDelete(email)}
          className="btn btn-primary"
        >
          Delete User
        </button>
      </form>
    </div>
  );
}

export default DeleteUser;
