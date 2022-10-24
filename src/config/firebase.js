// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//   apiKey: "AIzaSyCGZJRgvvv4J-VUp8NTj7rfzhm5MpSHPHk",
//   authDomain: "hotel-booking-bb1ce.firebaseapp.com",
//   projectId: "hotel-booking-bb1ce",
//   storageBucket: "hotel-booking-bb1ce.appspot.com",
//   messagingSenderId: "642064984379",
//   appId: "1:642064984379:web:a9ae124ece51bfcd3b2f1e",
//   measurementId: "G-4M21KW83ZP"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAOnVDl78L8QGrzcgNbkvYTQvo3UbK__jU",
  authDomain: "restaurantadmin-7e1b8.firebaseapp.com",
  projectId: "restaurantadmin-7e1b8",
  storageBucket: "restaurantadmin-7e1b8.appspot.com",
  messagingSenderId: "800212711492",
  appId: "1:800212711492:web:21a58e737959f23dade411",
  measurementId: "G-NWTJGPMVPY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app);
const storage =getStorage(app);

export {auth,db, storage}