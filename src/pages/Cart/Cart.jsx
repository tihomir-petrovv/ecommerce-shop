import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/context/UserContext/UserContext";
import {
  getUserCart,
  increaseOrDecreaseItemAmount,
  itemAmountLiveChange,
  removeItemFromUserCart,
} from "../../services/UserServices/cart-services";
import { Box, Button, ImageListItem, Typography } from "@mui/material";
import "./Cart.css";

export default function Cart() {
  const { user } = useContext(AppContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      getUserCart(user.uid).then((snapshot) => {
        setCart(snapshot);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = itemAmountLiveChange(user.uid, setCart);
      return () => unsubscribe();
    }
  }, [user]);

  const removeItem = (product) => {
    removeItemFromUserCart(user.uid, product);
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const itemAmountChange = async (product, typeOfOperand) => {
    increaseOrDecreaseItemAmount(user.uid, product, typeOfOperand);
  };

  if (!cart) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "15px",
        margin: "0px 10px 0px 10px",
      }}
      className="cart-container"
    >
      {cart.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                borderRadius: "15px",
              }}
              className="cart-items"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                <ImageListItem
                  key={item.image}
                  sx={{
                    width: "120px",
                    objectFit: "cover",
                  }}
                >
                  <img src={item.image} alt={item.title} />
                </ImageListItem>
                <Typography
                  variant="h6"
                  sx={{
                    width: "45vw",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className="cart-amount"
              >
                <Typography variant="h5">${item.price}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Button
                    disabled={item.amount === 1}
                    sx={{
                      fontSize: "30px",
                      width: "10px",
                    }}
                    onClick={() => itemAmountChange(item, "-")}
                  >
                    -
                  </Button>
                  <Typography variant="h5">{item.amount}</Typography>
                  <Button
                    sx={{
                      fontSize: "30px",
                      width: "10px",
                    }}
                    onClick={() => itemAmountChange(item, "+")}
                  >
                    +
                  </Button>
                </Box>
                <Typography
                  variant="h7"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => removeItem(item)}
                >
                  Remove from cart
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="h5">Your cart is empty</Typography>
      )}
      {cart.reduce((acc, item) => acc + item.price * item.amount, 0) > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography variant="h5">
            Total: $
            {cart
              .reduce((acc, item) => acc + item.price * item.amount, 0)
              .toFixed(2)}
          </Typography>
          <Button variant="contained">Checkout</Button>
        </Box>
      )}
    </Box>
  );
}
