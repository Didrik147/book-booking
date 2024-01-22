const searchEl = document.querySelector('.search')
const booksEl = document.querySelector('.books')



console.log('There is a total of', booksArr.length, 'books in the library')

// Sorterer alfabetisk
booksArr.sort()

function clearInput(){
    searchEl.value = ""
}

clearInput()

function displayBook(book){
    booksEl.innerHTML += `
    <a href="./books/${book}.html" class="book" onclick="clearInput()">
        <img src="./books/covers/${book}.jpg" alt="${book}">
    </a>
    `
}

booksArr.forEach(book => {  
    displayBook(book)
})



searchEl.addEventListener("input", filter)


function filter(){
    booksEl.innerHTML = ""
    booksArr.forEach(book => {
        let text = searchEl.value
        text = text.toLowerCase()
        text = text.replace(" ", "-")
        //console.log(text)
        if (book.includes(text)) {
            //console.log(book)
            displayBook(book)
        }
    })
}

