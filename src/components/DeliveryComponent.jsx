import React, { useState } from "react";
import axios from "axios";
function DeliveryComponent() {
  const [emailReadOnly, setEmailReadOnly] = useState(false);
  const [phoneReadOnly, setPhoneReadOnly] = useState(false);
  const [pincodeReadOnly, setPincodeReadOnly] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/check-email", {
        email: formData.email,
      });
      console.log(response.data.message);
      setEmailMsg(response.data.message);
      if (response.data.message === "Email found in the database") {
        setEmailReadOnly(true);
      } else {
        setEmailReadOnly(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/check-phone", {
        phone: formData.phone,
      });
      console.log(response.data.message);
      setPhoneMsg(response.data.message);
      if (response.data.message === "phone found in the database") {
        setPhoneReadOnly(true);
      } else {
        setPhoneReadOnly(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePincodeCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/check-pincode", {
        pincode: formData.pincode,
      });
      console.log(response.data.message);
      setPincodeMsg(response.data.message);
      if (response.data.message === "pincode found in the database") {
        setPincodeReadOnly(true);
      } else {
        setPincodeReadOnly(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (emailMsg !== "" && phoneMsg !== "" && pincodeMsg !== "") {
      if (
        emailMsg === "Email found in the database" &&
        phoneMsg === "phone found in the database"
      ) {
        if (pincodeMsg === "pincode found in the database") {
          try {
            const response = await axios.post(
              "http://localhost:8800/delivery",
              formData
            );
            console.log(response.data);
            setFormData({
              name: "",
              phone: "",
              email: "",
              pincode: "",
              address: "",
            });
            setEmailMsg("");
            setPhoneMsg("");
            setPincodeMsg("");
            alert("Your Order is Placed");
            // navigate("/")
          } catch (err) {
            console.log(err);
          }
        } else {
          alert("Pincode not serviceable");
        }
      } else {
        alert("Your are not a registered user");
      }
    } else {
      alert("Please Check all the required fields");
    }
  };

  return (
    <div className="container">
      <h2>Delivery Details</h2>
      <form>
        <div>
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="form-label" htmlFor="phone">
            Phone:
          </label>
          <input
            className="form-control"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            readOnly={phoneReadOnly}
            required
          />
          <button className="btn btn-info mt-2" onClick={handlePhoneCheck}>
            Check
          </button>
          <p>{phoneMsg}</p>
        </div>
        <div>
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
            readOnly={emailReadOnly}
            required
          />
          <button className="btn btn-info mt-2" onClick={handleEmailCheck}>
            Check
          </button>
          <p>{emailMsg}</p>
        </div>

        <div>
          <label className="form-label" htmlFor="address">
            Address:
          </label>
          <input
            className="form-control"
            type="text"
            id="address"
            name="address"
            required
            onChange={handleInputChange}
            value={formData.address}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="pincode">
            Pincode:
          </label>
          <input
            className="form-control"
            type="number"
            id="pincode"
            name="pincode"
            required
            onChange={handleInputChange}
            value={formData.pincode}
            readOnly={pincodeReadOnly}
          />
          <button className="btn btn-info mt-2" onClick={handlePincodeCheck}>
            Check
          </button>
          <p>{pincodeMsg}</p>
        </div>
        <button
          className="btn btn-primary mt-2 mb-3"
          onClick={handleClick}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeliveryComponent;
