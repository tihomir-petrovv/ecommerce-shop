import { equalTo, get, orderByChild, query, ref, set } from "firebase/database"
import { db } from "../../config/firebase-config"

export const getUserHandle = (username) => {
    return get(ref(db, `users/${username}`))
}

export const createUser = (username, firstName, lastName, uid, email, phoneNumber) => {
    return set(ref(db, `users/${username}`), {
        firstName,
        lastName,
        uid,
        email,
        phoneNumber,
        createdOn: new Date().valueOf()
    });
};

export const getUserData = (uid) => {
    return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)))
}