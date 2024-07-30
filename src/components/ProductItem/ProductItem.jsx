import { useContext } from "react";
import { setItemsToUserCart } from "../../services/UserServices/cart-services";
import { AppContext } from "../context/UserContext/UserContext";
import PropTypes from "prop-types";

export default function ProductItem({ product }) {
  const { user } = useContext(AppContext);
  const addToCart = (product) => {
    setItemsToUserCart(user.uid, product);
  };

  return (
    <div key={product.id} className="item">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  }),
};
