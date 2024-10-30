// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD8cYoS-vL5txyo1qyOr1R1RK-R4WVRz6A",
  authDomain: "infinityfashion-f9396.firebaseapp.com",
  projectId: "infinityfashion-f9396",
  storageBucket: "infinityfashion-f9396.appspot.com",
  messagingSenderId: "279082486125",
  appId: "1:279082486125:web:1faade54d4f2a03a3eb264",
  measurementId: "G-TLPZKQ30XT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Exporta auth para autenticación
export const googleProvider = new GoogleAuthProvider();  // Exporta el proveedor de Google
