import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAMVU_AJr3vBklt-Cs_c1BbQZLp553KEBQ",
  authDomain: "projectcloud-f1c09.firebaseapp.com",
  databaseURL: "https://projectcloud-f1c09-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projectcloud-f1c09",
  storageBucket: "projectcloud-f1c09.firebasestorage.app",
  messagingSenderId: "1096738858528",
  appId: "1:1096738858528:web:a0b606e5a51ba709787e45",
  measurementId: "G-FJLYC2DX7J"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };