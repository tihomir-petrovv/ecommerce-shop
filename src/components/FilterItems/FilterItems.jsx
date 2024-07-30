import { useState } from "react";
import PropTypes from "prop-types";
import "./FilterItems.css";

export default function FilterItems({ setMinPrice, setMaxPrice}) {
  const [minPrice, setMinimumPrice] = useState(0);
  const [maxPrice, setMaximumPrice] = useState(1000);

  return (
    <div className="filter">
      <label>
        Min Price:
        <input
          type="range"
          min="0"
          max="1000"
          step={10}
          value={minPrice}
          onChange={(e) => {
            setMinPrice(Number(e.target.value));
            setMinimumPrice(Number(e.target.value));
          }}
        />
        {minPrice}
      </label>
      <label>
        Max Price:
        <input
          type="range"
          min="0"
          max="1000"
          step={10}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setMaximumPrice(Number(e.target.value));
          }}
        />
        {maxPrice}
      </label>
    </div>
  );
}

FilterItems.propTypes = {
    setMinPrice: PropTypes.func.isRequired,
    setMaxPrice: PropTypes.func.isRequired,
};
