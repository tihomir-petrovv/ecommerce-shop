import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJaD5GvkwNfiXLiiA9_AATe1Bh-lCJsnc",
  authDomain: "ecommerce-bbe4a.firebaseapp.com",
  databaseURL: "https://ecommerce-bbe4a-default-rtdb.firebaseio.com",
  projectId: "ecommerce-bbe4a",
  storageBucket: "ecommerce-bbe4a.appspot.com",
  messagingSenderId: "101089837307",
  appId: "1:101089837307:web:3f5c3188d25560db6cb05e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)
export const storage = getStorage(app)
