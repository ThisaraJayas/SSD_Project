// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "dormlk-2d1dd.firebaseapp.com",

  projectId: "dormlk-2d1dd",

  storageBucket: "dormlk-2d1dd.appspot.com",

  messagingSenderId: "505256631166",

  appId: "1:505256631166:web:23fde400aa72ac1e70312f"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);