import { get, off, onValue, query, ref, set } from "firebase/database";
import { db } from "../../config/firebase-config";

export const getUserCart = async (userId) => {
  const snapshot = await get(query(ref(db, `carts/${userId}`)));

  if (!snapshot.exists()) {
    return [];
  }

  const products = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));

  return products;
};

export const setItemsToUserCart = (userId, product) => {
  return set(ref(db, `carts/${userId}/${product.id}`), {
    ...product,
    amount: 1,
  });
};

export const removeItemFromUserCart = (userId, product) => {
  return set(ref(db, `carts/${userId}/${product.id}`), null);
};

export const increaseOrDecreaseItemAmount = async (
  userId,
  product,
  typeOfOperand
) => {
  const snapshot = await get(query(ref(db, `carts/${userId}/${product.id}`)));

  if (!snapshot.exists()) {
    return [];
  }

  if (typeOfOperand === "+") {
    let itemAmount = snapshot.val().amount;
    itemAmount++;
    return set(ref(db, `carts/${userId}/${product.id}`), {
      ...product,
      amount: itemAmount,
    });
  }

  if (typeOfOperand === "-") {
    let itemAmount = snapshot.val().amount;
    if (itemAmount <= 1) {
      return;
    }
    itemAmount--;
    return set(ref(db, `carts/${userId}/${product.id}`), {
      ...product,
      amount: itemAmount,
    });
  }
};

export const itemAmountLiveChange = (userId, setCart) => {
    const cartRef = ref(db, `carts/${userId}`);

    const callback = (snapshot) => {
        if(snapshot.exists()){
            const cart = snapshot.val()
            setCart(cart)
        }else{
            setCart(null)
        }
    }

    onValue(cartRef, callback)

    return () => off(cartRef, callback)
}