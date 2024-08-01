import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/context/UserContext/UserContext";
import {
  favoriteItemsAmountLiveChange,
} from "../../services/UserServices/favorite-services";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Box, Typography } from "@mui/material";

export default function Favorites() {
  const { user } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const subscription = favoriteItemsAmountLiveChange(
        user.uid,
        setFavorites
      );
      return () => subscription();
    }
  }, [user]);

  if (!favorites) {
    return (
      <Box
        id="items"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 2,
          padding: 2,
        }}
      >
        <Typography variant="h4">Favorites</Typography>
        <Typography variant="h5">No favorite items</Typography>
      </Box>
    );
  }

  return (
    <Box
      id="items"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 2,
        padding: 2,
      }}
    >
      <Typography variant="h4">Favorites</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "start",
          gap: 2,
        }}
      >
        {favorites.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
