let myLibrary = [];

let book_id = 0;

function Book(name, author, pages, read) {
    this.id = book_id;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(name, author, pages, read) {
    const new_book = new Book(name, author, pages, read);
    myLibrary.push(new_book);
    return new_book;
}
function toggle() {
    document.querySelector(".popup").classList.toggle("active");
    add_button.toggleAttribute('disabled');
    delete_button.toggleAttribute('disabled');
}

document.addEventListener('DOMContentLoaded', ()=> {
    let cancel = document.querySelector(".cancel");
    let add_button = document.querySelector("#add_button");
    let delete_button = document.querySelector("#delete_button");
    let form = document.querySelector(".popup");
    let name = document.querySelector("#name");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let read = document.querySelector("#read");
    let main = document.querySelector(".main");

    function clear() {
        while (myLibrary.length > 0) {
            myLibrary.pop();
        }
        main.innerHTML = "";
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    

    function createBook(event, id) {
        event.preventDefault();
        toggle();
        new_book = addBook(name.value, author.value, pages.value, read.checked);

        div = document.createElement('div');
        div.id = "book" + id;
        div.classList.add("book");
        div.style.background = getRandomColor();
        div.innerHTML = `
            <h3>${name.value}</h3>
            <h4>By: ${author.value}</h4>
            <h5>Pages: ${pages.value}</h5>
            <br>
            <div class="wrapper">
                <h5>
                    Read:  
                    <input id=read${id} class="readbutton" type="checkbox" ${read.checked ? 'checked' : ''}>
                </h5>
                <button id=delete${id}>Delete</button>
            </div>`;
        main.appendChild(div);

        name.value = "";
        author.value = "";
        pages.value = "";
        read.checked = false;
        book_id += 1;

        document.getElementById(`read${id}`).addEventListener('click', () => {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id === id) {
                    myLibrary[id].read = !(myLibrary[id].read);
                    break;
                }
            }
        })
        document.getElementById(`delete${id}`).addEventListener('click', () => {
            console.log(id);
            let newLibrary = [];
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id !== id) {
                    newLibrary.push(myLibrary[i]);
                }
            }
            myLibrary = newLibrary;
            document.querySelector(`#book${id}`).remove();
        })
    }

    delete_button.addEventListener('click', clear);
    add_button.addEventListener("click", toggle);
    form.addEventListener("submit", (event) => createBook(event, book_id));
    cancel.addEventListener("click", toggle);
})




