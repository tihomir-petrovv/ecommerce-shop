import { useContext, useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { CartContext } from "../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import "./ItemsMenu.css";

export default function ItemsMenu() {
  const { products } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(false);

  const [changeBurgerMenu, setChangeBurgerMenu] = useState(false);

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
    setChangeBurgerMenu(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setChangeBurgerMenu(false);
  }

  const goToCategoryItems = (category) => {
    return navigate(`/category/${category}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
      }}
      className="categories-menu"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgb(242, 242, 247)",
          boxShadow: " 0px 2px rgba(0, 0, 0, 0.1)",
          color: "#3939f5",
          borderRadius: "5px",
          padding: "0 5px",
        }}
      >
        {changeBurgerMenu === false && <RxHamburgerMenu />}
        {changeBurgerMenu === true && <IoMdClose />}
        <Button onClick={handleClick} className="menu-button">
          Categories
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
        >
          {categories.map((category) => {
            return (
              <MenuItem
                key={category}
                onClick={() => {
                  goToCategoryItems(category);
                  handleClose();
                }}
              >
                {category}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </Box>
  );
}
