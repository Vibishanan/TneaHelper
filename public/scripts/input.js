import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { collection, getDocs, getFirestore, addDoc, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const storage = getStorage(app);

document.getElementById("addDeptButton").addEventListener("click", () => {
    const inputContainer = document.getElementById("deptField");
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.classList.add("text-input");
    newInput.name = "departmentFields[]";
    inputContainer.appendChild(newInput);
});

document.getElementById("updateButton").addEventListener("click", async () => {
    const form = document.getElementById("myForm");
    const formData = new FormData(form);
    document.getElementById("spin").style.visibility = "visible";
    const departmentFields = Array.from(document.getElementsByName("departmentFields[]"));
    const departments = departmentFields.map(department => department.value.trim());

    formData.append("departments", JSON.stringify(departments));

    const name = formData.get('name');
    const description = formData.get('description');
    const counselingCode = formData.get('counselingCode');
    const region = formData.get('Region');
    const founder = formData.get('founder');
    const image = formData.get('image');
    const pincode = formData.get('pincode');
    var data = {};
    if(counselingCode == ""){
        window.alert("Counselling code is mandatory to update");
        return;
    }
    if(departments[0] != "")
        data.Departments = departments;
    if(name!="")    
        data.name = name;
    if(region!="")
        data.Region = region;
    if(counselingCode!="")
        data.code = parseInt(counselingCode);
    if(founder!="")
        data.founder = founder;
    if(description!="")
        data.description = description;
    if(pincode!="") 
        data.pincode = parseInt(pincode);

    const collegesRef = collection(db, "colleges");
    const querySnapshot = await getDocs(query(collegesRef, where("code", "==", parseInt(counselingCode))));

    if (querySnapshot.docs.length === 0) {
        document.getElementById("spin").style.visibility = "hidden";
        alert("No college found");
        return;
    }
    if (image.name !== "") {
        const storageRef = ref(storage, "images/" + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        window.alert('Upload is paused');
                        break;
                    case 'running':
                        window.alert('Upload is running');
                        break;
                }
            },
            (error) => {
                window.alert(error.message);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                data.imageUrl = downloadURL;

                const docId = querySnapshot.docs[0].id;
                await updateDoc(doc(collegesRef, docId), data);

                document.getElementById("spin").style.visibility = "hidden";
                alert("Data updated successfully");
            });
    } else {
        const docId = querySnapshot.docs[0].id;
        await updateDoc(doc(collegesRef, docId), data);

        document.getElementById("spin").style.visibility = "hidden";
        alert("Data updated successfully");
    }

});


document.getElementById("addButton").addEventListener("click", async () => {
    const form = document.getElementById("myForm");
    const formData = new FormData(form);
    document.getElementById("spin").style.visibility = "visible";
    const departmentFields = Array.from(document.getElementsByName("departmentFields[]"));
    const departments = departmentFields.map(department => department.value.trim());

    formData.append("departments", JSON.stringify(departments));

    const name = formData.get('name');
    const description = formData.get('description');
    const counselingCode = formData.get('counselingCode');
    const region = formData.get('Region');
    const founder = formData.get('founder');
    const image = formData.get('image');
    const pincode = formData.get('pincode');

    if (name == "" || departments[0] == "" || description == "" || region == "" || founder == "" || image.name == "" || pincode == "" || counselingCode == "") {
        window.alert("Please enter all fields.");
        return;
    }

    var data = {};
    data.Departments = departments;
    data.name = name;
    data.Region = region;
    data.code = parseInt(counselingCode);
    data.founder = founder;
    data.description = description
    data.pincode = parseInt(pincode);

    const collegesRef = collection(db, "colleges");
    const q = query(collegesRef, where("code", "==", parseInt(counselingCode)));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        document.getElementById("spin").style.visibility = "hidden";
        alert("Data already exists");
        return;
    }

    const storageRef = ref(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case 'paused':
                    window.alert('Upload is paused');
                    break;
                case 'running':
                    window.alert('Upload is running');
                    break;
            }
        },
        (error) => {
            window.alert(error.message);
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            data.imageUrl = downloadURL;

            const docRef = await addDoc(collegesRef, data);
            document.getElementById("spin").style.visibility = "hidden";
            alert("Data added");
        });

});

