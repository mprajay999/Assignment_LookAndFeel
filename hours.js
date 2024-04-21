let books = [];

function displayBooks() {
  let tableBody = document.getElementById("table-list");
  tableBody.innerHTML = "";

  books.forEach(book => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>
        <button class="btn-edit" data-id="${book.id}">Edit</button>
        <button class="btn-delete" data-id="${book.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Add event listeners to edit and delete buttons after displaying the books
  document.querySelectorAll(".btn-edit").forEach(button => {
    button.addEventListener("click", function() {
      let id = this.getAttribute("data-id");
      let book = books.find(book => book.id == id);
      if (book) {
        document.getElementById("title-input").value = book.title;
        document.getElementById("author-input").value = book.author;
        document.getElementById("genre-input").value = book.genre;
        document.getElementById("update-btn").setAttribute("data-id", id);
      }
    });
  });

  document.querySelectorAll(".btn-delete").forEach(button => {
    button.addEventListener("click", function() {
      let id = this.getAttribute("data-id");
      deleteBook(id);
    });
  });
}

function addBook(title, author, genre) {
  let id = books.length + 1;
  let newBook = { id, title, author, genre };
  books.push(newBook);
  displayBooks();
}

function updateBook(id, title, author, genre) {
  let index = books.findIndex(book => book.id == id);
  if (index !== -1) {
    books[index].title = title;
    books[index].author = author;
    books[index].genre = genre;
    displayBooks();
  }
}

function deleteBook(id) {
  books = books.filter(book => book.id != id);
  displayBooks();
}

document.getElementById("crud-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let title = document.getElementById("title-input").value;
  let author = document.getElementById("author-input").value;
  let genre = document.getElementById("genre-input").value;
  addBook(title, author, genre);
  this.reset();
});

document.getElementById("update-btn").addEventListener("click", function() {
  let id = this.getAttribute("data-id");
  let title = document.getElementById("title-input").value;
  let author = document.getElementById("author-input").value;
  let genre = document.getElementById("genre-input").value;
  updateBook(id, title, author, genre);
});

// Initialize the table
displayBooks();