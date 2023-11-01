// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBR_XbSTiGnimNRBJAcSuUNcPmkoPcGREA",
  authDomain: "frete-a8155.firebaseapp.com",
  projectId: "frete-a8155",
  storageBucket: "frete-a8155.appspot.com",
  messagingSenderId: "369502865637",
  appId: "1:369502865637:web:ea765e423bb45c67d66c0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);