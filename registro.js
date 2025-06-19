import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtthzJwazs2126kihYVnyUs-_2e05ZnVg",
  authDomain: "adviseal-2025.firebaseapp.com",
  projectId: "adviseal-2025",
  storageBucket: "adviseal-2025.firebasestorage.app",
  messagingSenderId: "951370047460",
  appId: "1:951370047460:web:c0075642b68d12049eb1f1",
  measurementId: "G-NW2D2W884N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


// Registro
document.getElementById("btnRegistro").addEventListener("click", async () => {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value;
  const grado = document.getElementById("grado").value;
  const grupo = document.getElementById("grupo").value;
  const especialidad = document.getElementById("especialidad").value;

  if (!nombre || !correo || !contrasena || grado === "Grado" || grupo === "Grupo" || especialidad === "Especialidad") {
    alert("Completa todos los campos correctamente");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nombre,
      correo,
      grado,
      grupo,
      especialidad
    });

    alert("¡Registro exitoso 🥳!");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Error: " + error.message);
  }
});
