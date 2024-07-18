import { NavLink } from "react-router-dom";

export default function Header () {

    return (
        <header>
            <NavLink to={"/home"}>Home</NavLink>
            <NavLink to={"/cart"}>Cart</NavLink>
            <NavLink to={"/checkout"}>CheckOut</NavLink>
        </header>
    )
}