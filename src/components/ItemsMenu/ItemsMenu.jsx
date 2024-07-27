import { useContext, useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { CartContext } from "../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function ItemsMenu() {
  const { products } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  let currentlyHovering = false;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (products) {
      const categories = products.map((product) => product.category);
      const uniqueCategories = [...new Set(categories)];
      setCategories(uniqueCategories);
    }
  }, [products]);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }

  const menuItemOnClick = (category) => {
    return navigate(`/category/${category}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          width: "50%",
          zIndex: "100",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          boxShadow: " 0px 2px rgba(0, 0, 0, 0.1)",
          color: "#646cff",
          borderRadius: "10px",
        }}
      >
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onMouseOver={handleClick}
          onMouseLeave={handleCloseHover}
        >
          Categories
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            onMouseEnter: handleHover,
            onMouseLeave: handleCloseHover,
            style: { pointerEvents: "auto" },
          }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{ pointerEvents: "none", zIndex: 200, width: "500px" }}
        >
          {categories.map((category) => {
            return (
              <MenuItem key={category} onClick={() => {
                menuItemOnClick(category);
                handleClose();
              }}>
                {category}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </Box>
  );
}
