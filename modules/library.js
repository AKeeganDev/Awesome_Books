import Book from './book.js';
import StrShelf from './strshelf.js';

export default class Library {
  shelf = [];

  bookshelf;

  addButton = document.querySelector('.add-btn');

  newTitle = document.getElementById('newTitle');

  newAuthor = document.getElementById('newAuthor');

  frontShelf = document.getElementById('frontShelf');

  removeButton;

  bookRemoved = false;

  static pushToStorage = (obj) => {
    const stringify = JSON.stringify(obj);
    localStorage.setItem('strShelf', stringify);
  }

  static displayBook = (title, author, id) => `
      <span class="title-author">"${title}" by ${author}</span>
      <button class="removeButton" id="${id}" type="button">Remove</button>
      `;

  pullFromStorage = () => {
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
    if ((Object.keys(JSON.parse(localStorage.strShelf))[0] === undefined)) {
      this.frontShelf.innerHTML = '<div class="pre-book">'
        + '<span>There\'s nothing worse than an empty library :-(</span>'
        + '</div>';
    }
  }

  updateShelf = () => {
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

  newBook = (title, author) => {
    this.bookshelf = new StrShelf();
    const book = new Book();
    book.title = title;
    book.author = author;
    this.shelf.unshift(book);
    this.updateShelf();
  }

  removeBook = (id) => {
    this.bookshelf = new StrShelf();

    // this.frontShelf.innerHTML = '';
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

  setRemoveListeners = () => {
    this.removeButton = document.querySelectorAll('.removeButton');
    this.removeButton.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.bookRemoved = true;
        this.removeBook(e.target.id);
      });
    });
  }

  setUpAddListener = () => {
    this.addButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.bookRemoved = false;
      this.newBook(this.newTitle.value, this.newAuthor.value);
      this.pullFromStorage();
      this.newTitle.value = '';
      this.newAuthor.value = '';
      this.setRemoveListeners();
    });
  }

  setShelf = () => {
    if ((Object.keys(JSON.parse(localStorage.strShelf))[0] === undefined)) {
      return;
    }

    if (localStorage.getItem('strShelf') !== undefined) {
      const localStorageData = Object.values(JSON.parse(localStorage.getItem('strShelf')));

      for (let i = 0; i < localStorageData.length; i += 1) {
        this.shelf.push(localStorageData[i]);
      }

      this.pullFromStorage();
      this.setRemoveListeners();
    }
  }
}