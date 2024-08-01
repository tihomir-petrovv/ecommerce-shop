import PropTypes from "prop-types";
import "./FavPopUp.css";
import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function FavPopUp({ open, FavItems }) {
  return (
    <Box className={open === true ? "fav-pop-up" : "not-open"}>
      {open && (
        <Box>
          <Typography id="recently-added-el">Recently added</Typography>
          <Box className="fav-pop-up-items">
            {FavItems && FavItems.map((product) => (
              <Box key={product.id} className="fav-pop-up-item">
                <img src={product.image} alt={product.title} />
                {product.title.length > 30 ? (
                  <h3 className="pop-up-title">{product.title.slice(0, 20)}</h3>
                ) : (
                  <h3 className="pop-up-title">{product.title}</h3>
                )}
                <h4>{product.price} BGN</h4>
              </Box>
            ))}
          </Box>
          <Button sx={{
            width: "85%",
            height: "30px",
            margin: "10px",
            backgroundColor: "#6cc4ff",
          }}
          variant="contained">
            <NavLink to={"/favorites"} id="view-all-link">View all</NavLink>
          </Button>
        </Box>
      )}
    </Box>
  );
}

FavPopUp.propTypes = {
  open: PropTypes.bool,
  FavItems: PropTypes.array,
};
