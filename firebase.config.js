/** @format */

/** @format */

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHlmSgA0woeNod-oAH3rOOnCBSAAWj5As",
  authDomain: "techshopfyp.firebaseapp.com",
  projectId: "techshopfyp",
  storageBucket: "techshopfyp.appspot.com",
  messagingSenderId: "763368259957",
  appId: "1:763368259957:web:87314ed68cc073c452933c",
  measurementId: "G-PL7VFS7SR5"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = isSupported().then(() => {
//   getAnalytics(app);
// });
// export const auth = getAuth(app);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
