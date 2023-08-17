import React, { useState } from "react";
import DeliveryComponent from "./DeliveryComponent";
import PickupComponent from "./PickupComponent";

function Home() {
  const [formOption, setFormOption] = useState("");

  const handleChange = (e) => {
    setFormOption(e.target.value);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <label htmlFor="option">Choose Mode of Order:</label> <br />
        <select
          id="option"
          name="option"
          value={formOption}
          onChange={handleChange}
          required
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
