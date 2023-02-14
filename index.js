const bookContainer = document.querySelector('.book-container');
const holder = document.createElement('div');

const addTitle = document.querySelector('.add-title');
const addAuthor = document.querySelector('.add-author');
const button = document.querySelector('.btn');

let books;

const saveBooks = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

const savedBooks = JSON.parse(localStorage.getItem('books'));
if (Array.isArray(savedBooks)) {
  books = savedBooks;
} else {
  books = [];
}

class Book {
  constructor(title, author, id = '' + new Date().getTime()){
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

const createBooks = (title, author) => {
  const id = `${new Date().getTime()}`;
  books.push({
    title,
    author,
    id,
  });

  saveBooks();
};

const deleteBooks = (idToDelete) => {
  books = books.filter((book) => book.id !== idToDelete);

  saveBooks();
};

const render = () => {
  holder.innerHTML = '';

  const list = document.createElement('ul');

  books.forEach((book) => {
    const listItem = document.createElement('li');
    listItem.id = book.id;
    const title = document.createElement('h2');
    title.innerHTML = book.title;
    const author = document.createElement('p');
    author.innerHTML = book.author;

    const removeBooks = (event) => {
      const buttonDelete = event.target;
      const idToDelete = buttonDelete.id;

      deleteBooks(idToDelete);
      render();
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'remove';
    deleteButton.setAttribute('id', book.id);
    deleteButton.onclick = removeBooks;

    const line = document.createElement('hr');

    listItem.append(title, author, deleteButton, line);
    list.appendChild(listItem);
    holder.appendChild(list);
  });
};

const addBooks = () => {
  const title = addTitle.value;
  const author = addAuthor.value;

  createBooks(title, author);
  render();
};

bookContainer.appendChild(holder);

button.addEventListener('click', addBooks);

window.onload = render();