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

// Date
const dateContainer = document.querySelector('.our-date');

const dateOrdinal = (num) => {
  if(num == 31 || num == 21 || num == 1) return num + 'st';
  else if(num == 23 || num == 3) return num + 'rd';
  else if (num == 22 || num ==2) return num + 'nd';
  else return num + 'th';
}

const addZero = (num) => {
  return num = (num < 10)? '0' + num : num;
}

const showDate = () => {
  let output;
  let currentDate;
  let currentTime;
  let date = new Date();

  let month = date.toLocaleString('default', {month: 'long'});
  let day = dateOrdinal(date.getDate());
  let year = date.getFullYear();

  currentDate = `${month} ${day} ${year}`;

  let h = addZero((date.getHours()) - 12);
  let m = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());
  let ampm;

  (h <= 12)? ampm = 'pm' : ampm = 'am';

  currentTime = `${h}:${m}:${s} ${ampm}`;


  output = `${currentDate}, ${currentTime}`
  dateContainer.innerHTML = output;
}

setInterval(showDate, 1000);

// Navigations

