import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { collection, addDoc, getFirestore} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAppyT94_w9O2iqJRglAdoAs6zvAdY13DU",
    authDomain: "tnea-helper.firebaseapp.com",
    projectId: "tnea-helper",
    storageBucket: "tnea-helper.appspot.com",
    messagingSenderId: "26539798518",
    appId: "1:26539798518:web:39b73c92e768aef600e1d7"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const feedback = collection(db, "reviews");

function addLeadingZero(number) {
    return (number < 10 ? '0' : '') + number;
}

document.getElementById("send").addEventListener("click",async ()=>{
    var data = {};
    var nameInput = document.getElementById('name').value;
    var emailInput = document.getElementById('email').value;
    var noofstars = document.getElementById('nostars').value;
    var messageInput = document.getElementById('message').value;
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; 
    var year = currentDate.getFullYear();

    var dates = addLeadingZero(day) + '/' + addLeadingZero(month) + '/' + year;
    data.date = dates;

    if(nameInput == "" || emailInput == "" || noofstars == "" || messageInput ==""){
        window.alert("Kindly fill all the details");
        return;
    }
    data.name = nameInput;
    data.email = emailInput;
    data.nostars = parseInt(noofstars);
    data.message = messageInput;
    await addDoc(feedback, data);
    window.alert("Your feedback added successfully");
});