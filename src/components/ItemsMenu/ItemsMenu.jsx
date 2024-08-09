import { useContext, useEffect, useState, useRef } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { CartContext } from "../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";

export default function ItemsMenu({ openMenu, setOpenMenu }) {
  const { products } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [changeBurgerMenu, setChangeBurgerMenu] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (products) {
      const categories = products.map((product) => product.category);
      const uniqueCategories = [...new Set(categories)];
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClick() {
    setOpenMenu(!openMenu);
    setOpenDrawer(!openDrawer);
    setChangeBurgerMenu(!changeBurgerMenu);
  }

  function handleClose() {
    setOpenMenu(false);
    setOpenDrawer(false);
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
        ref={boxRef}
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
          padding: "5px",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleClick}
      >
        {changeBurgerMenu === false && <RxHamburgerMenu />}
        {changeBurgerMenu === true && <IoMdClose />}
        {matches && <Typography variant="body1">Categories</Typography>}
        {matches && openMenu && (
          <Box
            sx={{
              position: "absolute",
              top: "28px",
              width: "109px",
              left: "0px",
              height: "50px",
              backgroundColor: "rgb(242, 242, 247)",
              color: "white",
              zIndex: 1111,
            }}
          ></Box>
        )}
        {matches && openMenu && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
              position: "absolute",
              top: "44px",
              left: "0px",
              width: "200px",
              backgroundColor: "rgb(242, 242, 247)",
              borderRadius: "5px",
              boxShadow: "0px 2px rgba(0, 0, 0, 0.1)",
              zIndex: 1111,
            }}
          >
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category}
                  onClick={() => {
                    goToCategoryItems(category);
                    handleClose();
                  }}
                >
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      {!matches && openDrawer && (
        <Drawer anchor="top" open={openDrawer} onClose={handleClose} sx={{
          '& .MuiDrawer-paper': {
            top: '53px',
          },
        }}>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category}
                onClick={() => {
                  goToCategoryItems(category);
                  handleClose();
                }}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
}

ItemsMenu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
};
