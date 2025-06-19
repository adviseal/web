// login.js
import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value.trim();
  const pass   = document.getElementById('contrasena').value;

  try {
    // 1) Logueamos
    const cred = await signInWithEmailAndPassword(auth, correo, pass);
    const uid  = cred.user.uid;

    // 2) Leemos Firestore para saber el grado
    const snap = await getDoc(doc(db, 'usuarios', uid));
    if (!snap.exists()) {
      alert('Perfil no encontrado, por favor regístrate de nuevo.');
      return window.location.href = 'registro.html';
    }

    const grado = snap.data().grado; // "1" … "6"
    const grupo = snap.data().grupo; // "a" … "g"
    // 3) Redirijo al HTML correcto
    window.location.href = `${grado}${grupo}.html`;

  } catch (err) {
    alert('Error al iniciar sesión: ' + err.message);
  }
});
