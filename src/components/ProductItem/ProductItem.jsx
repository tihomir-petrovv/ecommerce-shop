import { useContext } from "react";
import { setItemsToUserCart } from "../../services/UserServices/cart-services";
import { AppContext } from "../context/UserContext/UserContext";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductItem({ product }) {
  const { user } = useContext(AppContext);
  const addToCart = (product) => {
    setItemsToUserCart(user.uid, product);
  };

  return (
    <div key={product.id} className="item">
      <div className="item-props">
        <img src={product.image} alt={product.title} />
        {product.title.length > 30 ? (
          <h2>{product.title.slice(0, 20).concat("...")}</h2>
        ) : (
          <h2>{product.title}</h2>
        )}
        <p>${product.price}</p>
      </div>
      <div className="add-to-cart-btn" onClick={() => addToCart(product)}>
        <div id="icon">
          <FaShoppingCart />
        </div>
        <div id="btn">
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  }),
};
