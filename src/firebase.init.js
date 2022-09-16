// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7tReVwuXUQSyGLb6WhkCZ9V58zHgu7KY",
    authDomain: "openbank-reza.firebaseapp.com",
    projectId: "openbank-reza",
    storageBucket: "openbank-reza.appspot.com",
    messagingSenderId: "88397832386",
    appId: "1:88397832386:web:da4f63238a5fdf7b5a9b5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;