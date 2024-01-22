tableEl = document.querySelector("table")
tbodyEl = document.querySelector("tbody")

tbodyEl.innerHTML = ``

let timestamps = []
let persons = []
let dates = []

let cardArr = []

function compareTime(b, a) {
    if (a.timestamp < b.timestamp) {
        return -1;
    }
    if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;

}

for (let i = 0; i < booksArr.length; i++) {
    let bookTitle = booksArr[i]

    db.collection(bookTitle).orderBy("timestamp", "desc").get().then((snapshot) => {
        if (snapshot.size > 0) {
            let documents = snapshot.docs;

            let data = documents[0].data()
            //console.log(data)

            let title = ""

            bookTitle.split("-").forEach(word => {
                title += `${word[0].toUpperCase()}${word.substring(1)} `
            })
            data.title = title

            cardArr.push(data)
        }else {
            let title = ""

            bookTitle.split("-").forEach(word => {
                title += `${word[0].toUpperCase()}${word.substring(1)} `
            })
            let data = {
                title: title,
                date: "Not yet",
                name: 'None',
                timestamp: 0
            }

            cardArr.push(data)
        }



    }).then(() => {
        if (i === booksArr.length - 1) {
            cardArr.sort(compareTime)

            //console.log(cardArr)

            for (let i = 0; i < booksArr.length; i++) {
                tbodyEl.innerHTML += `
                <tr>
                    <td>${cardArr[i].title}</td>
                    <td>${cardArr[i].date}</td>
                    <td>${cardArr[i].name}</td>
                </tr>        
            `
            }
        }

    });

}
