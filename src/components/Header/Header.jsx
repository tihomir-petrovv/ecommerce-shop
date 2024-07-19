import { NavLink } from "react-router-dom";
import "./Header.css";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

export default function Header() {
  return (
    <header id="header">
      <NavLink to={"/home"}>eShop.bg</NavLink>
      <h3>Menu</h3>
      <input type="text" />
      <NavLink to={"/cart"}>
        <PiShoppingCartThin />
      </NavLink>
      <NavLink to={"/favorites"}>
        <CiHeart />
      </NavLink>
    </header>
  );
}
