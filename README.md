📚 Book Nook – Server

Backend API for Book Nook, a book library management application. Built with Node.js, Express.js, and MongoDB.

🔗 Project Links

Live Website: Add your live client URL here

Client Repository: [Book Nook Client](https://github.com/fuyad254/Book-Nook)


🛠️ Technologies Used

Node.js

Express.js

MongoDB

JWT Authentication (JOSE)

CORS

dotenv

✨ Key Features

Fetch all books and latest books.

Add, update, and delete books.

Get book details by ID.

Manage user-added books.

Borrow and return books.

View borrowed books by user.

Prevent duplicate borrowing of the same book.

Secure protected routes using JWT verification.

⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/fuyad254/Book-Nook-Server.git

2. Navigate to the project directory

cd Book-Nook-Server

3. Install dependencies

npm install

4. Create a .env file

MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=your_client_application_url

5. Start the server

node index.js

Server runs on:

http://localhost:5000

📡 API Endpoints

Method

Endpoint

Description

GET

/books

Get all books

GET

/latest-books

Get latest books

GET

/book/:id

Get book details

GET

/my-books/:email

Get user's books

GET

/borrows/:email

Get borrowed books

POST

/add-book

Add a new book

PATCH

/my-books/:id

Update a book

PATCH

/my-borrow/:id

Update available copies

PATCH

/my-borrow-return/:id

Return book copies

POST

/my-borrow

Borrow a book

DELETE

/my-borrow/:id

Delete borrow record

DELETE

/my-books/:id

Delete a book

🗄️ Database

Database: bookNook

Collections:

book

borrow

🔐 Authentication

Protected API routes use JWT verification through JOSE.

Include the following header when accessing protected routes:


Book Nook – A simple and efficient book library management system.
