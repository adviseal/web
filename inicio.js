// inicio.js
import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { doc, getDoc }         from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const btn = document.getElementById('btnEmpezar');
btn.addEventListener('click', () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Si NO está logueado → login
      return window.location.href = 'login.html';
    }
    // Si SÍ → leo su grado
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    if (!snap.exists()) {
      return window.location.href = 'registro.html';
    }
    const grado = snap.data().grado;  // "1"… "6"
    // Redirijo al HTML <grado>.html
    window.location.href = `${grado}.html`;
  });
});
