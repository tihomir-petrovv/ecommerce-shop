import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import "./ProductDetail.css";
import { setItemsToUserCart } from "../../services/UserServices/cart-services";
import { AppContext } from "../context/UserContext/UserContext";
import { useContext } from "react";

export default function ProductDetail({ product }) {
  const { user } = useContext(AppContext)
  const addToCart = (product) => {
    setItemsToUserCart(user.uid, product)
  }

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <h1 id="product-details-title">{product.title}</h1>
      <Box id="product-details-main-container">
        <img src={product.image} alt={product.title} />
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "start",
            alignItems: "start",
            width: "30%",
            height: "100%",
        }}>
          <h3>${product.price}</h3>
          <Button variant="contained" onClick={() => addToCart(product)}>Add to cart</Button>
          <Button variant="contained">Add to favorites</Button>
        </Box>
      </Box>
      <p>{product.description}</p>
    </Box>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
};
