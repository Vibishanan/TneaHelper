import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { collection, getDocs, getFirestore, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAppyT94_w9O2iqJRglAdoAs6zvAdY13DU",
    authDomain: "tnea-helper.firebaseapp.com",
    projectId: "tnea-helper",
    storageBucket: "tnea-helper.appspot.com",
    messagingSenderId: "26539798518",
    appId: "1:26539798518:web:39b73c92e768aef600e1d7"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const did = urlParams.get('doccode');

    if (did) {
        const ref = collection(db, "colleges");
        const q = query(ref, where("code", "==", parseInt(did)));
        const querySnapshot = await getDocs(q);

        const doc = querySnapshot.docs[0];
        const data = doc.data();

        
        document.getElementById("img").setAttribute("src",data.imageUrl);
        document.getElementById("name").innerText = data.name;
        document.getElementById("description").innerText = data.description;
        const dept = data.Departments;
        for(var i=0;i<dept.length;i++){
            const deptList = document.getElementById("departments");
            const li = document.createElement("li");
            li.innerText = dept[i];
            deptList.appendChild(li);
        }
        document.getElementById("address").innerText = data.pincode;
        document.getElementById("code").innerText = data.code;
        document.getElementById("founder").innerText = data.founder;

    } else {
        console.error('Doccode not found in URL parameters.');
    }

});
