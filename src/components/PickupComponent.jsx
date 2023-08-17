import React, { useState } from "react";
import axios from "axios";

function PickupComponent() {
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
    pincode: "",
    pickUpLocation: "",
    preferredTime: "",
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
          if (formData.preferredTime) {
            const [hours, minutes] = formData.preferredTime.split(":");
            const preferredTimeHours = parseInt(hours, 10);
            const preferredTimeMinutes = parseInt(minutes, 10);

            if (
              (preferredTimeHours >= 8 && preferredTimeHours < 24) ||
              (preferredTimeHours === 0 && preferredTimeMinutes === 0)
            ) {
              try {
                const response = await axios.post(
                  "http://localhost:8800/pickup",
                  formData
                );
                console.log(response.data);
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  pincode: "",
                  pickUpLocation: "",
                  preferredTime: "",
                });
                setEmailMsg("");
                setPhoneMsg("");
                setPincodeMsg("");
                alert("Your Order is Placed");
              } catch (err) {
                console.log(err);
              }
            } else {
              alert("Pick Up not possible in selected time");
            }
          } else {
            alert("Please enter Preferred Time");
          }
        } else {
          alert("Please enter correct Pin Code");
        }
      } else {
        setFormData({
          phone: "",
          email: "",
        });
        alert("You are not a registered user");
      }
    } else {
      alert("Please Check all the required fields");
    }
  };

  return (
    <div>
      <h2>Pickup Details</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            pattern="[0-9]{10,15}"
            onChange={handleInputChange}
            readOnly={phoneReadOnly}
            required
          />
          <br />
          <button onClick={handlePhoneCheck}>Check</button>
          <p>{phoneMsg}</p>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly={emailReadOnly}
            required
          />
          <br />
          <button onClick={handleEmailCheck}>Check</button>
          <p>{emailMsg}</p>
        </div>
        <div>
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            pattern="[0-9]{6}"
            onChange={handleInputChange}
            readOnly={pincodeReadOnly}
            required
          />
          <br />
          <button onClick={handlePincodeCheck}>Check</button>
          <p>{pincodeMsg}</p>
        </div>
        <div>
          <label htmlFor="pickUpLocation">Pickup Location:</label>
          <input
            type="text"
            id="pickUpLocation"
            name="pickUpLocation"
            value={formData.pickUpLocation}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="preferredTime">Preferred Time:</label>
          <input
            type="time"
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            required
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleClick} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PickupComponent;
