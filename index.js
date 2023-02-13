const bookContainer = document.querySelector('.book-container');
const holder = document.createElement('div');

const addTitle = document.querySelector('.add-title');
const addAuthor = document.querySelector('.add-author');
const button = document.querySelector('.btn');

let books;

const savedBooks = JSON.parse(localStorage.getItem('books'));
if (Array.isArray(savedBooks)){
  books = savedBooks
}else {
  books = [];
}

const createBooks = (title, author) => {
  const id = '' + new Date().getTime()
  books.push({
    title: title,
    author: author,
    id: id,
  });

  saveBooks();
}

const addBooks = () => {
  const title = addTitle.value;
  const author = addAuthor.value;

  createBooks(title, author);
  render();
}

const deleteBooks = idToDelete => {
  books = books.filter((book) => {
    if(book.id === idToDelete){
      return false
    }else {
      return true
    }
  });
  
  saveBooks();
}

const removeBooks = (event) => {
  const buttonDelete = event.target;
  const idToDelete = buttonDelete.id;
  
  deleteBooks(idToDelete)
  render()
}

const saveBooks = () => {
  localStorage.setItem('books', JSON.stringify(books));
}

window.onload = render = () => {
  holder.innerHTML = '';

  const list = document.createElement('ul');

  books.forEach((book) => {
    const listItem = document.createElement('li');
    listItem.id = book.id;
    const title = document.createElement('h2');
    title.innerHTML = book.title;
    const author = document.createElement('p');
    author.innerHTML = book.author;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'remove'
    deleteButton.setAttribute('id', book.id);
    deleteButton.onclick = removeBooks

    const line = document.createElement('hr');

    listItem.append(title, author, deleteButton, line);
    list.appendChild(listItem);
    holder.appendChild(list);
  });
}

render();

bookContainer.appendChild(holder);

button.addEventListener('click', addBooks);