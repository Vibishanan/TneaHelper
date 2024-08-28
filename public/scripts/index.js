import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const firebaseConfig = {
  apiKey: "AIzaSyAppyT94_w9O2iqJRglAdoAs6zvAdY13DU",
  authDomain: "tnea-helper.firebaseapp.com",
  projectId: "tnea-helper",
  storageBucket: "tnea-helper.appspot.com",
  messagingSenderId: "26539798518",
  appId: "1:26539798518:web:39b73c92e768aef600e1d7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

document.getElementById("google-sign-btn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.href = "./home.html";
    })
    .catch((error) => {
      window.alert(error);
    });
});

document.getElementById("login").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    window.alert("Login Successful");
    window.location.href = "./home.html";
  } catch (error) {
    window.alert("Something went wrong");
  }
});


document.getElementById("sign-up").addEventListener("click", async () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const username = document.getElementById("signup-username").value;

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredentials.user, { displayName: username });
    window.alert("Sign up successful! Login to continue");
    location.reload(true);
  } catch (error) {
    window.alert("Something went wrong");
  }
});