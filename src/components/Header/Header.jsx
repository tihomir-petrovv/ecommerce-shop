import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/UserContext/UserContext";
import { logoutUser } from "../../services/UserServices/auth-services";
import {
  getUserCart,
  itemAmountLiveChange,
} from "../../services/UserServices/cart-services";
import {
  favoriteItemsAmountLiveChange,
  getUserFavoriteItems,
} from "../../services/UserServices/favorite-services";
import FavPopUp from "./FavoritesPopUp/FavPopUp";

export default function Header() {
  const { user, setUserContext } = useContext(AppContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [openFavPopUp, setOpenFavPopUp] = useState(false);

  useEffect(() => {
    if (user) {
      getUserCart(user.uid).then((data) => {
        setCartItems(data);
      });
      getUserFavoriteItems(user.uid).then((data) => {
        setFavoriteItems(data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = itemAmountLiveChange(user.uid, setCartItems);
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = favoriteItemsAmountLiveChange(
        user.uid,
        setFavoriteItems
      );
      return () => unsubscribe();
    }
  }, [user]);

  const logOut = () => {
    logoutUser();
    setUserContext({
      user: null,
      userData: null,
    });
    navigate("/home");
  };

  const handleFavPopUp = () => {
    if (openFavPopUp === true) {
        setOpenFavPopUp(!openFavPopUp);
    } else {
      setOpenFavPopUp(!openFavPopUp);
    }
  };

  return (
    <header id="header">
      <NavLink to={"/home"}>eShop.bg</NavLink>
      <input type="text" />
      <div className="cart-items">
        <NavLink to={"/cart"}>
          <PiShoppingCartThin />
          {cartItems && cartItems.length > 0 ? (
            <h3>{cartItems.length}</h3>
          ) : null}
        </NavLink>
      </div>
      <div
        className="cart-items"
        onMouseEnter={handleFavPopUp}
        onMouseLeave={handleFavPopUp}
      >
        <NavLink to={"/favorites"}>
          <CiHeart />
          {favoriteItems && favoriteItems.length > 0 ? (
            <h3>{favoriteItems.length}</h3>
          ) : null}
        </NavLink>
        <FavPopUp open={openFavPopUp} FavItems={favoriteItems} />
      </div>
      {user ? (
        <div>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <NavLink to={"/signIn"}>Sign In</NavLink>
          <NavLink to={"/logIn"}>Log In</NavLink>
        </div>
      )}
    </header>
  );
}
