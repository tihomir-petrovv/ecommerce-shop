// import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/Checkout";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="product/:id" exact element={<ProductDetails />} />
        <Route path="cart" exact element={<Cart />} />
        <Route path="checkout" exact element={<CheckOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
