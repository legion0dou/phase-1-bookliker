document.addEventListener("DOMContentLoaded", function() {});
// JavaScript code for your BookLiker application

const baseUrl = 'http://localhost:3000';
const bookList = document.querySelector('#list');
const bookDetails = document.querySelector('#show-panel');
let currentUser = { id: 1, username: 'pouros' };

// Function to fetch and render the list of books
function fetchAndRenderBooks() {
  fetch(`${baseUrl}/books`)
    .then((response) => response.json())
    .then((books) => {
      bookList.innerHTML = ''; // Clear the book list
      books.forEach((book) => {
        const bookItem = document.createElement('li');
        bookItem.textContent = book.title;
        bookItem.addEventListener('click', () => showBookDetails(book));
        bookList.appendChild(bookItem);
      });
    });
}

// Function to show book details when a book is clicked
function showBookDetails(book) {
  bookDetails.innerHTML = ''; // Clear the book details

  const bookTitle = document.createElement('h2');
  bookTitle.textContent = book.title;

  const bookThumbnail = document.createElement('img');
  bookThumbnail.src = book.img_url;

  const bookDescription = document.createElement('p');
  bookDescription.textContent = book.description;

  const likeButton = document.createElement('button');
  likeButton.textContent = 'LIKE';
  likeButton.addEventListener('click', () => likeBook(book));

  const likedBy = document.createElement('ul');
  book.users.forEach((user) => {
    const userItem = document.createElement('li');
    userItem.textContent = user.username;
    likedBy.appendChild(userItem);
  });

  bookDetails.appendChild(bookTitle);
  bookDetails.appendChild(bookThumbnail);
  bookDetails.appendChild(bookDescription);
  bookDetails.appendChild(likeButton);
  bookDetails.appendChild(likedBy);
}

// Function to like a book
function likeBook(book) {
  if (book.users.some((user) => user.id === currentUser.id)) {
    alert('You already liked this book.');
    return;
  }

  book.users.push(currentUser);

  fetch(`${baseUrl}/books/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ users: book.users }),
  })
    .then(() => showBookDetails(book));
}

// Initial fetch and render when the page loads
fetchAndRenderBooks();
