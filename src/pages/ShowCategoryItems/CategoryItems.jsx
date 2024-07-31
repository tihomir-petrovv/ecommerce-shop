import { useContext, useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { CartContext } from "../../components/context/CartContext/CartContext";
import { useParams } from "react-router-dom";
import FilterItems from "../../components/FilterItems/FilterItems";
import { Box, Typography } from "@mui/material";
import SortItems from "../../components/SortItems/SortItems";

export default function CategoryItems() {
  const { products } = useContext(CartContext);
  const { categoryID } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("price-asc");

  useEffect(() => {
    if (products) {
      const categoryProducts = products.filter(
        (product) =>
          product.category === categoryID &&
          product.price >= minPrice &&
          product.price <= maxPrice
      );
      categoryProducts.sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.price - b.price;
        } else if (sortBy === "price-desc") {
          return b.price - a.price;
        } else if (sortBy === "title-asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
      setCategoryProducts(categoryProducts);
    }
  }, [products, categoryID, minPrice, maxPrice, sortBy]);

  if (!categoryProducts) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        gap: 2,
      }}
    >
      <FilterItems setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 2,
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            width: "100%",
          }}>
            <Typography variant="h5">{categoryID}</Typography>
            <Typography variant="h5">
              {categoryProducts.length} items
            </Typography>
          </Box>
          <SortItems setSortBy={setSortBy} />
        </Box>
        <div id="items">
          {categoryProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </Box>
    </Box>
  );
}
