import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { collection, getDocs, getFirestore} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

function createCard(doc) {
    const container = document.getElementsByClassName('reviewSection')[0];

    const reviewItem = document.createElement('div');
    reviewItem.classList.add('reviewItem');

    const top = document.createElement('div');
    top.classList.add('top');

    const clientImage = document.createElement('div');
    clientImage.classList.add('clientImage');

    const span = document.createElement('span');
    span.textContent = doc.data().name;

    clientImage.appendChild(span);

    const ul = document.createElement('ul');

    var stars = parseInt(doc.data().nostars);
    for (let i = 0; i < stars; i++) {
        const li = document.createElement('li');
        const star = document.createElement('i');
        star.classList.add('fa-solid', 'fa-star');
        li.appendChild(star);
        ul.appendChild(li);
    }
    for (let i = stars; i < 5; i++) {
        const li = document.createElement('li');
        const star = document.createElement('i');
        star.classList.add('fa-regular', 'fa-star');
        li.appendChild(star);
        ul.appendChild(li);
    }

    top.appendChild(clientImage);
    top.appendChild(ul);

    const article = document.createElement('article');

    const reviewParagraph = document.createElement('p');
    reviewParagraph.classList.add('review');
    reviewParagraph.textContent = doc.data().message;

    const dateParagraph = document.createElement('p');
    dateParagraph.innerText = doc.data().date;

    article.appendChild(reviewParagraph);
    article.appendChild(dateParagraph);

    reviewItem.appendChild(top);
    reviewItem.appendChild(article);

    container.appendChild(reviewItem);
}

const querySnapshot = await getDocs(collection(db, "reviews"));
querySnapshot.forEach((doc) => {
    createCard(doc);
});
