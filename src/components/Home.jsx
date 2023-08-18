import React, { useState } from "react";
import DeliveryComponent from "./DeliveryComponent";
import PickupComponent from "./PickupComponent";

function Home() {
  const [formOption, setFormOption] = useState("");

  const handleChange = (e) => {
    setFormOption(e.target.value);
  };
  return (
    <div className="container mt-2" style={{ textAlign: "center" }}>
      <div>
        <h6 htmlFor="option">Choose Mode of Order:</h6> <br />
      </div>
      <div>
        <select
          id="option"
          name="option"
          value={formOption}
          onChange={handleChange}
          required
          className="form-control mb-3"
        >
          <option value="">Select an option</option>
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>
      {formOption === "pickup" && <PickupComponent />}
      {formOption === "delivery" && <DeliveryComponent />}
    </div>
  );
}

export default Home;
