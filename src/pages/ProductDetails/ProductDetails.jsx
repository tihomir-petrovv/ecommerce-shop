import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext/CartContext";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ItemSuggestions from "../../components/ItemSuggestions/ItemSuggestions";

export default function ProductDetails() {
  const productID = useParams();
  const [product, setProduct] = useState(null);
  const { products } = useContext(CartContext);

  useEffect(() => {
    if (products) {
      const product = products.find(
        (product) => product.id === Number(productID.id)
      );
      setProduct(product);
    }
  }, [products, productID]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
        {/* Maybe add the category for the product to be as menu here */}
      <ProductDetail product={product} />
      <ItemSuggestions products={products} product={product} />
    </div>
  );
}
