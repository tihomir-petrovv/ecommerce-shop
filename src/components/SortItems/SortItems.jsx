import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function SortItems({ setSortBy }) {
  const [sort, setSort] = useState("price");

  const handleSort = () => {
    setSortBy(sort);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSort();
    }
  };

  return (
    <Box sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
    }}>
      <Box>
        <Typography variant="h6">Sort By: </Typography>
      </Box>
      <label>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            handleSort();
          }}
          onKeyDown={handleKeyPress}
        >
          <option value="price-asc">Price (low-to-high)</option>
          <option value="price-desc">Price (high-to-low)</option>
          <option value="title-asc">Title (a-z)</option>
          <option value="title-desc">Title (z-a)</option>
        </select>
      </label>
    </Box>
  );
}

SortItems.propTypes = {
  setSortBy: PropTypes.func,
};
