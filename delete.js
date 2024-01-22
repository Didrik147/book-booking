const selectBookEl = document.querySelector('#selectBook')
const tableEl = document.querySelector('table')
const tbodyEl = document.querySelector('tbody')

selectBookEl.innerHTML = ''
optionEl = document.createElement('option')
optionEl.value = ''
optionEl.innerText = ''

selectBookEl.appendChild(optionEl)
booksArr.forEach(book => {
    optionEl = document.createElement('option')
    optionEl.value = book
    optionEl.innerText = book

    selectBookEl.appendChild(optionEl)
})

tbodyEl.innerHTML = ''

selectBookEl.addEventListener('change', getBookings)

function getBookings(){
    tbodyEl.innerHTML = ''
    if (selectBookEl.value != ''){
        db.collection(selectBookEl.value).orderBy("timestamp", "desc").get().then((snapshot) => {
            let documents = snapshot.docs;
            //console.log(documents)

            documents.forEach(document => {
                //console.log(document.id)
                let data = document.data()
                //console.log(data)
                let id = document.id

                tbodyEl.innerHTML += `
                <tr>
                    <td>${data.date}</td>
                    <td>${data.name}</td>
                    <td>
                        <button class='delete' data-id='${id}' onClick='deleteBooking("${id}")'>✖</button>
                    </td>
                </tr>        
            `
            })
        })
    }
    
}


function deleteBooking(id){
    //console.log(id)
    console.log('Sletter booking...')
    tbodyEl.innerHTML = ''
    db.collection(selectBookEl.value).doc(id).delete().then(() => {
        getBookings()
    })
    

}




/*
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
    } else {
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
*/