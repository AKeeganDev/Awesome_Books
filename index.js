/* eslint-disable max-classes-per-file */

import Library from './modules/library.js';
import { DateTime } from './luxon.js';

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

const library = new Library();

const pageSetup = () => {
  newPage.className = hidden;
  contactPage.className = hidden;
  if (!localStorage.strShelf) {
    return '';
  }

  library.setShelf();
  return '';
};

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

const dt = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
document.getElementById('date-time').innerHTML = dt;

library.setUpAddListener();