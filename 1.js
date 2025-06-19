// 1.js (Tareas con EmailJS)
import { db, auth } from './firebase.js';
import {
  collection, addDoc, onSnapshot, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// EmailJS
import "https://cdn.emailjs.com/dist/email.min.js";

emailjs.init("f1GXXafhFah2C-Cay"); // Tu Public Key

const form     = document.getElementById("formTarea");
const lista    = document.getElementById("listaTareas");
const filtroM  = document.getElementById("filtroMateria");
const filtroP  = document.getElementById("filtroPrioridad");
const btnCerrar= document.getElementById("cerrarSesion");

onAuthStateChanged(auth, (user) => {
  if (!user) return window.location.href = "login.html";

  const ref = collection(db, "tareas");
  onSnapshot(ref, snap => {
    lista.innerHTML = "";
    snap.docs.forEach(d => {
      const t = d.data();
      if (t.usuarioId !== user.uid) return;
      if (filtroM.value && t.materia !== filtroM.value) return;
      if (filtroP.value && t.prioridad !== filtroP.value) return;

      const div = document.createElement("div");
      div.className = "tarea";
      div.innerHTML = `
        <h3>${t.titulo}</h3>
        <p>${t.descripcion}</p>
        <small><strong>Entrega:</strong> ${t.fecha} a las ${t.hora}</small><br>
        <p><strong>${t.materia}</strong> — Prioridad <strong>${t.prioridad}</strong></p>
        <button data-id="${d.id}">X</button>
      `;
      div.querySelector("button").onclick = () => deleteDoc(doc(db, "tareas", d.id));
      lista.append(div);
    });
  });
});

form.onsubmit = async e => {
  e.preventDefault();
  const user = auth.currentUser;
  const data = {
    usuarioId: user.uid,
    titulo: form.titulo.value,
    descripcion: form.descripcion.value,
    fecha: form.fecha.value,
    hora: form.hora.value,
    materia: form.materia.value,
    prioridad: form.prioridad.value
  };

  await addDoc(collection(db, "tareas"), data);

  // Enviar correo con EmailJS
  await emailjs.send("servicio_cq0m6yw", "plantilla_a61xp0r", {
    titulo: data.titulo,
    descripcion: data.descripcion,
    fecha: data.fecha,
    hora: data.hora,
    materia: data.materia,
    prioridad: data.prioridad
  });

  form.reset();
};

// Filtros
[filtroM, filtroP].forEach(s => s.onchange = () => {
  // El snapshot ya lo maneja, así que no hace falta recargar.
});

btnCerrar.onclick = () => signOut(auth).then(() => location.href="login.html");
