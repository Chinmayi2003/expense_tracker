import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC24MyrH1SEEs8dCDbGkhFixiVQsKJQXY",
  authDomain: "expense-tracker-634e8.firebaseapp.com",
  projectId: "expense-tracker-634e8",
  storageBucket: "expense-tracker-634e8.firebasestorage.app",
  messagingSenderId: "3963095897",
  appId: "1:3963095897:web:6ea813db9909154bef9a48",
  measurementId: "G-HZ3N046V1Y"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
