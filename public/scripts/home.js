import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { collection, getDocs, getFirestore} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


$(".hamburger").click(function(){
    $(".wrapper").toggleClass("collapse");
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

const db = getFirestore(app)

function createCard(doc) {
    const container = document.querySelector('.band');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    const thumb = document.createElement('div');
    thumb.classList.add('thumb');
    thumb.style.backgroundImage = `url(${doc.data().imageUrl})`;

    const article = document.createElement('article');

    const titleElement = document.createElement('h1');
    titleElement.textContent = doc.data().name;

    const nameElement = document.createElement('span');
    nameElement.textContent = "Founder : "+doc.data().founder;

    const authorElement = document.createElement('span');
    authorElement.textContent = "Region : " + doc.data().Region;

    const button = document.createElement('a');
    button.classList.add('button');
    button.textContent = "Click here to view more";
    button.setAttribute('data-doc-id', doc.data().code);
    button.addEventListener('click', handleViewDetailsClick);


    article.appendChild(titleElement);
    article.appendChild(nameElement)
    article.appendChild(authorElement);
    cardContainer.appendChild(thumb);
    cardContainer.appendChild(article);
    cardContainer.appendChild(button);

    container.appendChild(cardContainer);
}

const querySnapshot = await getDocs(collection(db, "colleges"));
querySnapshot.forEach((doc) => {
        createCard(doc);
});

document.getElementById("search").addEventListener('click', function () {
    const name = document.getElementById("search-data").value.toLowerCase();
    const bandContainer = document.querySelector('.band');
    while (bandContainer.firstChild) {
        bandContainer.removeChild(bandContainer.firstChild);
    }
    var flag = true;
    querySnapshot.forEach((doc) => {
        if(doc.data().name.toLowerCase().includes(name)){
            createCard(doc);
            flag = false;
        }
        else if(doc.data().Region.toLowerCase().includes(name)){
            createCard(doc);
            flag = false;
        }
    });
    if(flag){
        const container = document.querySelector('.band');
        container.classList.add('text');
        container.innerHTML = "No results Found!";
    }
});

function handleViewDetailsClick(event) {
    const doccode = event.target.getAttribute('data-doc-id');
    window.location.href = `./app.html?doccode=${doccode}`;
}

