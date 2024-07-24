import { get, query, ref, set } from "firebase/database"
import { db } from "../../config/firebase-config"

export const getUserCart = async (userId) => {
    const snapshot = await get(query(ref(db, `carts/${userId}`)))

    if(!snapshot.exists()){
        return [];
    }

    const products = Object.keys(snapshot.val()).map((key) => ({
        id: key,
        ...snapshot.val()[key],
    }))

    return products
}

export const setItemsToUserCart = (userId, product) => {

    return set(ref(db, `carts/${userId}/${product.id}`), {
        ...product,
        amount: 1,
    })
}

export const removeItemFromUserCart = (userId, product) => {

    return set(ref(db, `carts/${userId}/${product.id}`), null)
}