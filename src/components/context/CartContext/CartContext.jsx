import { createContext } from "react";

export const CartContext = createContext({
  products: null,
  cart: null,
  setContext: () => { },
});