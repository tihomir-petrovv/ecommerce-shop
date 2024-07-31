import { useContext, useEffect, useState } from "react";
import { setItemsToUserCart } from "../../services/UserServices/cart-services";
import {
  getUserFavoriteItems,
  setItemsToUserFavorites,
  removeItemFromFavorites,
} from "../../services/UserServices/favorite-services";
import { AppContext } from "../context/UserContext/UserContext";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

export default function ProductItem({ product }) {
  const [inFavorites, setInFavorites] = useState(false);
  const { user } = useContext(AppContext);

  const addToCart = (product) => {
    setItemsToUserCart(user.uid, product);
  };

  const toggleFavorite = (product) => {
    if (inFavorites) {
      setInFavorites(false);
      removeItemFromFavorites(user.uid, product).catch(() => {
        setInFavorites(true);
      });
    } else {
      setInFavorites(true);
      setItemsToUserFavorites(user.uid, product).catch(() => {
        setInFavorites(false);
      });
    }
  };

  useEffect(() => {
    if (user) {
      getUserFavoriteItems(user.uid).then((data) => {
        if (data.find((item) => item.id === product.id)) {
          setInFavorites(true);
        } else {
          setInFavorites(false);
        }
      });
    }
  }, [user, product]);

  return (
    <div key={product.id} className="item">
      <div className="item-props">
        <div className={inFavorites ? "favorite-item" : "no-favorite-item"}>
          <MdFavorite
            onClick={() => {
              toggleFavorite(product);
            }}
          />
        </div>
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
