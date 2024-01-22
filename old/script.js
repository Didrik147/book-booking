// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm0RhmCYRp7PDJb8-3tCfl7WCFhFU2mTs",
    authDomain: "anette-s-booking.firebaseapp.com",
    projectId: "anette-s-booking",
    storageBucket: "anette-s-booking.appspot.com",
    messagingSenderId: "413204140380",
    appId: "1:413204140380:web:1ae5149f3d4d6c3db27199"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Lager en referanse til databasen
let db = firebase.firestore();



// Get elements from DOM
let bookBtn = document.querySelector("#book")
let nameEl = document.querySelector("#name")
let cardEl = document.querySelector("#card")
let coverEl = document.querySelector("#cover")

// Change book title here
let bookTitle = "the-last-library"
//let bookTitle = "the-inheritance-games"

coverEl.src = `./books/${bookTitle}.jpg`
coverEl.alt = bookTitle

bookBtn.addEventListener("click", bookBook)


function bookBook(){
    let name = nameEl.value
    console.log("Hello", name)
    console.log("We are booking your book")

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    let yyyy = today.getFullYear();
    let yy = String(yyyy).substring(2,4)
    

    todayDate = dd + '/' + mm + '-' + yy;
    console.log(todayDate);

    db.collection(bookTitle).add({
        name: name,
        date: todayDate,
        timestamp: Date.now()
    });

    nameEl.value = ""
    getLibraryCard()
}


function getLibraryCard(){
    cardEl.innerHTML = ""

    db.collection(bookTitle).orderBy("timestamp", "desc").get().then((snapshot) => {
        // Get the documents in the collection
        let documents = snapshot.docs;

        //console.log(documents);

        let theadEl = document.createElement("thead")
        let trEl = document.createElement("tr")

        let thEl = document.createElement("th")
        thEl.innerText = "Date"
        trEl.appendChild(thEl)
        thEl = document.createElement("th")
        thEl.innerText = "Name"
        trEl.appendChild(thEl)
        theadEl.appendChild(trEl)

        cardEl.appendChild(trEl)

        let tbodyEl = document.createElement("tbody")

        for(let i=0; i<documents.length; i++){
            let data = documents[i].data()
            //console.log(data)


            let trEl = document.createElement("tr")
            let tdEl = document.createElement("td")
            tdEl.innerText = data.date
            trEl.appendChild(tdEl)

            tdEl = document.createElement("td")
            tdEl.innerText = data.name
            trEl.appendChild(tdEl)

            tbodyEl.appendChild(trEl)
        }
        
        cardEl.appendChild(tbodyEl)

    });
}

getLibraryCard()
