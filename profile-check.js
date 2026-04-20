import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbMYt1jx1ZT8d6L9dg5Sz1ArvPC8_LVao",
  authDomain: "campusconnect-4f809.firebaseapp.com",
  projectId: "campusconnect-4f809",
  storageBucket: "campusconnect-4f809.appspot.com",
  messagingSenderId: "1070564995984",
  appId: "1:1070564995984:web:b330ec15b5d76c09b97915"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function ensureProfile(uid) {
  const profileRef = doc(db, "profiles", uid);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    window.location.href = "profile.html";
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    await ensureProfile(user.uid);
  } catch (error) {
    console.error(error);
    window.location.href = "login.html";
  }
});