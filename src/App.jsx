// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { CartContext } from "./components/context/CartContext/CartContext";
import { getProducts } from "./services/ProductServices/ProductServices";
import Favorites from "./pages/Favorites/Favorites";
import SignIn from "./pages/SignIn/SignIn";
import LogIn from "./pages/LogIn/LogIn";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/UserServices/user-services";
import { AppContext } from "./components/context/UserContext/UserContext";
import ItemsMenu from "./components/ItemsMenu/ItemsMenu";

function App() {
  const location = useLocation();
  const [cartContext, setCartContext] = useState({
    products: null,
  });

  const [userContext, setUserContext] = useState({
    user: null,
    userData: null,
  });

  const [user] = useAuthState(auth);

  useEffect(() => {
    getProducts().then((snapshot) => {
      setCartContext({ products: snapshot });
    });
  }, []);

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snapshot) => {
        if (snapshot.exists()) {
          setUserContext({
            user: user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        }
      });
    }
  }, [user]);

  const hideHeaderFooter = ["/signIn", "/logIn"];
  const showHeaderFooter = !hideHeaderFooter.includes(location.pathname);

  return (
    <AppContext.Provider value={{ ...userContext, setUserContext }}>
      <CartContext.Provider value={{ ...cartContext, setCartContext }}>
        {showHeaderFooter && <Header />}
        {showHeaderFooter && <ItemsMenu />}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favorites" element={<Favorites />} />
          {/* <Route path="/category/:category" element={<CategoryItems />} /> */}
        </Routes>
        {showHeaderFooter && <Footer />}
      </CartContext.Provider>
    </AppContext.Provider>
  );
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
