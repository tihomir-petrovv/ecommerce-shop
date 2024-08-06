import { useContext, useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { CartContext } from "../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export default function ItemsMenu() {
  const { products } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
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
    setChangeBurgerMenu(!changeBurgerMenu);
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
      onClick={handleClick}
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
          cursor: "pointer",
        }}
      >
        {changeBurgerMenu === false && <RxHamburgerMenu />}
        {changeBurgerMenu === true && <IoMdClose />}
        <Button className="menu-button">
          Categories
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
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