import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
signInWithEmailAndPassword,
signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBZKloygcG5VeFv5Kx_5pexeSDpkaQdjs",
  authDomain: "student-placement-tracke-b136d.firebaseapp.com",
  projectId: "student-placement-tracke-b136d",
  storageBucket: "student-placement-tracke-b136d.firebasestorage.app",
  messagingSenderId: "694002865378",
  appId: "1:694002865378:web:892b272c87fbe6612cbabb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {
db,
auth,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
signInWithEmailAndPassword,
signOut
};