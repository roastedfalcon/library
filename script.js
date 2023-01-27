//books and libary

class Book {
  constructor(title = "Unknown", author = "Unknown", pages = 0, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.books.some((book) => book.title === newBook.title)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }
}

const library = new Library();

//UI

const newBookBtn = document.querySelector("#new-book-button");
const bookHolder = document.querySelector("#book-holder");
const formContainer = document.querySelector("#form-container");
const form = document.querySelector("form");
const exitFormBtn = document.querySelector("#button-exit-form");
const overlay = document.querySelector("#overlay");

const openForm = () => {
  form.reset();
  formContainer.classList.add("active");
  overlay.classList.add("active");
};

const closeForm = () => {
  formContainer.classList.remove("active");
  overlay.classList.remove("active");
};

const updateBookHolder = () => {
  bookHolder.innerHTML = "";

  library.books.forEach((book) => createBookCard(book));
};

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book");
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.read) {
    readBtn.textContent = "Read";
    readBtn.classList.add("light-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("light-red");
  }

  bookHolder.appendChild(bookCard);
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
};

const addBook = (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);

  library.addBook(newBook);
  createBookCard(newBook);

  closeForm();
};

const removeBook = (e) => {
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', "");

  library.removeBook(title);
  updateBookHolder();
};

const toggleRead = (e) => {
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', "");
  const book = library.getBook(title);

  book.read = !book.read;
  updateBookHolder();
};

newBookBtn.onclick = openForm;
form.onsubmit = addBook;
exitFormBtn.onclick = closeForm;
overlay.onclick = closeForm;
