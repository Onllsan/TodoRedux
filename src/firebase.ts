import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYKoj_8xHGEb_xy7tW-bp1UJKslDW24U0",
  authDomain: "todolist-b0e58.firebaseapp.com",
  projectId: "todolist-b0e58",
  storageBucket: "todolist-b0e58.appspot.com",
  messagingSenderId: "409589198793",
  appId: "1:409589198793:web:33f8871d0e887d0d598218",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
