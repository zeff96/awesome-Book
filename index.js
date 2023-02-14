const bookContainer = document.querySelector('.book-container');
const holder = document.createElement('div');

holder.className = 'div-container';

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
  constructor(title, author, id = `${new Date().getTime()}`) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

const createBooks = (title, author) => {
  const myBooks = new Book(title, author);
  books.push(myBooks);

  saveBooks();
};

const deleteBooks = (idToDelete) => {
  books = books.filter((book) => book.id !== idToDelete);

  saveBooks();
};

const render = () => {
  holder.innerHTML = '';

  books.forEach((book) => {
    const listItem = document.createElement('div');
    listItem.id = book.id;
    listItem.className = 'list-item';

    const title = document.createElement('p');
    title.innerHTML = `"${book.title}"`;
    const by = document.createElement('p');
    by.innerText = 'by';
    const author = document.createElement('p');
    author.innerHTML = book.author;

    const removeBooks = (event) => {
      const buttonDelete = event.target;
      const idToDelete = buttonDelete.id;

      deleteBooks(idToDelete);
      render();
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'btn-container';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'remove';
    deleteButton.className = 'btn';
    deleteButton.setAttribute('id', book.id);
    deleteButton.onclick = removeBooks;

    const list = document.createElement('div');
    list.className = 'list-container';

    listItem.append(title, by, author);
    buttonContainer.appendChild(deleteButton);
    list.append(listItem, buttonContainer);
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