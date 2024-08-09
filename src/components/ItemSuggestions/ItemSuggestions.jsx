import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ItemSuggestions({ products, product }) {
  const [suggestion, setSuggestions] = useState(null);
  useEffect(() => {
    if (products) {
      const suggestion = products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setSuggestions(suggestion);
    }
  }, [products, product]);

  return (
    <Box>
      <Typography variant="h5">You may also like</Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {suggestion &&
          suggestion.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    gap: "0.5rem",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    minHeight: "fit-content",
                  }}
                >
                  {item.title.slice(0, 20)}
                </Typography>
                <Typography variant="body1" sx={{
                    width: "100%",
                    textAlign: "left",
                    minHeight: "50px",
                    color: "gray",
                }}>${item.price.toFixed(2)}</Typography>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

ItemSuggestions.propTypes = {
  products: PropTypes.array,
  product: PropTypes.object,
};
