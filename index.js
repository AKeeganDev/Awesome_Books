/* eslint-disable max-classes-per-file */

const libraryBtn = document.getElementById('LibraryBtn');
const newBtn = document.getElementById('NewBtn');
const contactBtn = document.getElementById('ContactBtn');

const libraryPage = document.getElementById('Library');
const newPage = document.getElementById('New');
const contactPage = document.getElementById('Contact');

const libraryStr = 'library';
const hidden = 'hidden';
const newStr = 'new';
const contactStr = 'contact';

function pageSetup() {
  newPage.className = hidden;
  contactPage.className = hidden;
}

pageSetup();

contactBtn.addEventListener('click', () => {
  libraryPage.className = hidden;
  newPage.className = hidden;
  contactPage.className = contactStr;
});

newBtn.addEventListener('click', () => {
  libraryPage.className = hidden;
  contactPage.className = hidden;
  newPage.className = newStr;
});

libraryBtn.addEventListener('click', () => {
  libraryPage.className = libraryStr;
  newPage.className = hidden;
  contactPage.className = hidden;
});

const dt = new Date();
document.getElementById('date-time').innerHTML = dt;

class Book {
  title;

  author;
}

class StrShelf {
}

class Library {
  shelf = [];

  bookshelf;

  addButton = document.querySelector('.add-btn');

  newTitle = document.getElementById('newTitle');

  newAuthor = document.getElementById('newAuthor');

  frontShelf = document.getElementById('frontShelf');

  removeButton;

  static pushToStorage(obj) {
    const stringify = JSON.stringify(obj);
    localStorage.setItem('strShelf', stringify);
  }

  static displayBook(title, author, id) {
    return `
        <span class="title-author">"${title}" by ${author}</span>
        <button class="removeButton" id="${id}" type="button">Remove</button>
        `;
  }

  pullFromStorage() {
    const parsed = JSON.parse(localStorage.getItem('strShelf'));
    let counter = this.shelf.length;
    const preShelf = [];
    for (let i = 0; i < this.shelf.length; i += 1) {
      const parsedBook = parsed[`${counter}`];
      const tempShelf = Library.displayBook(parsedBook.title, parsedBook.author, counter);
      preShelf.unshift(tempShelf);
      counter -= 1;
    }

    this.frontShelf.innerHTML = '';

    for (let i = 0; i < preShelf.length; i += 1) {
      const createdBook = document.createElement('div');
      createdBook.classList.add('book');
      createdBook.innerHTML = preShelf[i];
      createdBook.id = i + 1;
      this.frontShelf.appendChild(createdBook);
    }
  }

  updateShelf() {
    this.bookshelf = new StrShelf();
    let counter = 0;
    for (let i = 0; i < this.shelf.length; i += 1) {
      counter += 1;
      this.shelf[i].id = counter;
    }
    for (let i = 0; i < this.shelf.length; i += 1) {
      // GIVES THE BOOK OBJ AN ID #NUMBER
      this.bookshelf[`${this.shelf[i].id}`] = this.shelf[i];
    }
    Library.pushToStorage(this.bookshelf);
  }

  newBook(title, author) {
    this.bookshelf = new StrShelf();
    const book = new Book();
    book.title = title;
    book.author = author;
    this.shelf.unshift(book);
    this.updateShelf();
  }

  removeBook(id) {
    this.bookshelf = new StrShelf();

    this.frontShelf.innerHTML = '';
    this.removeButton = document.querySelectorAll('.removeButton');
    for (let i = 1; i <= this.shelf.length; i += 1) {
      if (this.shelf[i - 1].id === parseInt(id, 10)) {
        this.shelf.splice(i - 1, 1);
        this.updateShelf();
      }
      this.pullFromStorage();
      this.removeButton = document.querySelectorAll('.removeButton');
      this.removeButton.forEach((button) => {
        button.addEventListener('click', (e) => {
          this.removeBook(e.target.id);
        });
      });
    }
  }

  setRemoveListeners() {
    this.removeButton = document.querySelectorAll('.removeButton');
    this.removeButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.removeBook(e.target.id);
      });
    });
  }

  setUpAddListener() {
    this.addButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.newBook(this.newTitle.value, this.newAuthor.value);
      this.pullFromStorage();
      this.newTitle.value = '';
      this.newAuthor.value = '';
      this.setRemoveListeners();
    });
  }
}

const library = new Library();
library.setUpAddListener();
