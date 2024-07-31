import { get, query, ref, set } from "firebase/database";
import { db } from "../../config/firebase-config";

export const getUserFavoriteItems = async (userId) => {
    const snapshot = await get(query(ref(db, `favorites/${userId}`)));

  if (!snapshot.exists()) {
    return [];
  }

  const products = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));

  const sortByDate = products.sort((a,b) => a.addDate - b.addDate)

  return sortByDate;
}

export const removeItemFromFavorites = (userId, product) => {
    return set(ref(db, `favorites/${userId}/${product.id}`), null);
}

export const setItemsToUserFavorites = (userId, product) => {
  return set(ref(db, `favorites/${userId}/${product.id}`), {
    ...product,
    amount: 1,
    addDate: new Date().valueOf(),
  });
};
