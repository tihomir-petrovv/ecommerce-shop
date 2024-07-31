import { useState } from "react";
import PropTypes from "prop-types";
import "./FilterItems.css";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@mui/material";

export default function FilterItems({ setMinPrice, setMaxPrice }) {
  const [minPrice, setMinimumPrice] = useState(0);
  const [maxPrice, setMaximumPrice] = useState(1000);

  // Error message for invalid input in price range
  const [numberError, setNumberError] = useState("");

  const handleFilter = () => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setMinimumPrice(Number(value));
      setNumberError("");
    } else {
      setNumberError("Please enter only numbers");
      setTimeout(() => {
        setNumberError("");
      }, 3000);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setMaximumPrice(Number(value));
      setNumberError("");
    } else {
      setNumberError("Please enter only numbers");
      setTimeout(() => {
        setNumberError("");
      }, 3000);
    }
  };

  return (
    <div className="filter">
      <div>
        <h3>Price Range:</h3>
      </div>
      <div id="price-range">
        <label>
          <input
            type="text"
            min=""
            max="1000"
            step={10}
            value={minPrice}
            onChange={handleMinPriceChange}
            onKeyDown={handleKeyPress}
          />
        </label>
        <span> - </span>
        <label>
          <input
            type="text"
            min="0"
            max="1000"
            step={10}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            onKeyDown={handleKeyPress}
          />
        </label>
        <Button onClick={handleFilter}>
          <IoIosArrowForward />
        </Button>
      </div>
      {numberError && <p>{numberError}</p>}
    </div>
  );
}

FilterItems.propTypes = {
  setMinPrice: PropTypes.func.isRequired,
  setMaxPrice: PropTypes.func.isRequired,
};
