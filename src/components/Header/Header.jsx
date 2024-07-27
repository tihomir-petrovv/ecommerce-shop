import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useContext } from "react";
import { AppContext } from "../context/UserContext/UserContext";
import { logoutUser } from "../../services/UserServices/auth-services";

export default function Header() {
  const { user, setUserContext } = useContext(AppContext);
  const navigate = useNavigate();

  const logOut = () => {
    logoutUser();
    setUserContext({
      user: null,
      userData: null,
    });
    navigate("/home");
  };

  return (
    <header id="header">
      <NavLink to={"/home"}>eShop.bg</NavLink>
      <input type="text" />
      <NavLink to={"/cart"}>
        <PiShoppingCartThin />
      </NavLink>
      <NavLink to={"/favorites"}>
        <CiHeart />
      </NavLink>
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
