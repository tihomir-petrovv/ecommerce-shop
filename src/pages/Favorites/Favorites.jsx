import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/context/UserContext/UserContext";
import { getUserFavoriteItems } from "../../services/UserServices/favorite-services";


export default function Favorites() {
  const { user } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      getUserFavoriteItems(user.uid).then((data) => {
        setFavorites(data);
      });
    }
  }, [user]);

  if (!favorites) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="favorites">
      <div className="favorites-container">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <img src={favorite.image} alt={favorite.title} />
              <h2>{favorite.title}</h2>
              <p>${favorite.price}</p>
            </div>
          ))
        ) : (
          <h2>No favorites yet</h2>
        )}
      </div>
    </div>
  );
}
