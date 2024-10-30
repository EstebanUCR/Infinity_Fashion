// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDDB6z4avUKhiD_hO5NxS9jhhBPyImopv8",
  authDomain: "infinityfashion-da038.firebaseapp.com",
  projectId: "infinityfashion-da038",
  storageBucket: "infinityfashion-da038.firebasestorage.app",
  messagingSenderId: "745027377150",
  appId: "1:745027377150:web:7f034d0fcec722b08f12af"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Exporta auth para autenticación
export const googleProvider = new GoogleAuthProvider();  // Exporta el proveedor de Google
