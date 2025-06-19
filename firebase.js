// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtthzJwazs2126kihYVnyUs-_2e05ZnVg",
  authDomain: "adviseal-2025.firebaseapp.com",
  projectId: "adviseal-2025",
  storageBucket: "adviseal-2025.firebasestorage.app",
  messagingSenderId: "951370047460",
  appId: "1:951370047460:web:c0075642b68d12049eb1f1",
  measurementId: "G-NW2D2W884N"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta las herramientas para usarlas en otros archivos
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
