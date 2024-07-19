// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { CartContext } from "./components/context/CartContext/CartContext";
import { getProducts } from "./services/ProductServices/ProductServices";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const [cartContext, setCartContext] = useState({
    products: null,
  });

  useEffect(() => {
    getProducts()
    .then(snapshot => {
      setCartContext({products: snapshot})
    })
    }, []);
    
  return (
    <BrowserRouter>
      <CartContext.Provider value={{ ...cartContext, setCartContext }}>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
