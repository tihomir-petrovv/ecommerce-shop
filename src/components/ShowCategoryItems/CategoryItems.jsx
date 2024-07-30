import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { CartContext } from "../context/CartContext/CartContext";
import { useParams } from "react-router-dom";
import FilterItems from "../FilterItems/FilterItems";

export default function CategoryItems() {
  const { products } = useContext(CartContext);
  const { categoryID } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    if (products) {
      const categoryProducts = products.filter(
        (product) => product.category === categoryID && product.price >= minPrice && product.price <= maxPrice
      );
      setCategoryProducts(categoryProducts);
    }
  }, [products, categoryID, minPrice, maxPrice]);

  if (!categoryProducts) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <FilterItems setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
      <div id="items">
        {categoryProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
