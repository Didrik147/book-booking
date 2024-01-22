let fileName = location.href.split("/").slice(-1);

let bookTitle = fileName[0].split(".")[0]

//console.log(bookTitle)

bodyEl = document.querySelector("body")

bodyEl.innerHTML += `
    <div class="container">
        <article>
            <h1>You are currently booking...</h1>
            <img src="./covers/placeholder.png" id="cover" alt="Book cover image">
        </article>
        
        <article>
            <input type="text" id="name" placeholder="Your name..." autocomplete="off">
            <br>
            <button id="book">Book</button>
        </article>
        
        <article>
            <h2>Library Card</h2>
            <table id="card">

            </table>
        </article>
    </div>
`



// Get elements from DOM
let bookBtn = document.querySelector("#book")
let nameEl = document.querySelector("#name")
let cardEl = document.querySelector("#card")
let coverEl = document.querySelector("#cover")


coverEl.src = `./covers/${bookTitle}.jpg`
coverEl.alt = bookTitle

bookBtn.addEventListener("click", bookBook)
nameEl.addEventListener("change", bookBook)


function bookBook() {
    let name = nameEl.value
    if (name != '') {
        console.log("Hello", name)
        console.log("We are booking your book")

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
        let yyyy = today.getFullYear();
        let yy = String(yyyy).substring(2, 4)


        todayDate = dd + '/' + mm + '-' + yy;
        console.log(todayDate);

        db.collection(bookTitle).add({
            name: name,
            date: todayDate,
            timestamp: Date.now()
        });

        nameEl.value = ""
        getLibraryCard()

        alert(`Thank you ${name}, your book is boooked`)
    }

}


function getLibraryCard() {
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

        let antall = Math.min(documents.length, 5)

        for (let i = 0; i < antall; i++) {
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
