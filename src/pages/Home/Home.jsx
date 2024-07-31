import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext/CartContext";
import "./Home.css";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Box } from "@mui/material";

export default function Home() {
  const { products } = useContext(CartContext);
  if (!products) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box id="items">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Box>
  );
}
