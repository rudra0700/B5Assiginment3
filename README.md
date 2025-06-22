# 📚 Library Management System API
A full-featured Library Management REST API built using **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

## 🚀 Features

- 📖 Create, Read, Update, Delete (CRUD) books
- 📦 Borrow books with availability check
- 📊 Summary of borrowed books using aggregation
- ✅ Schema validation, custom error handling, filtering, sorting, and pagination
- 🧠 Clean code structure using TypeScript interfaces and Mongoose models

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Language**: TypeScript
- **Database**: MongoDB using Mongoose
- **Testing**: Postman or Thunder Client

## 📦 Project Setup

```bash
git clone https://github.com/your-username/library-management.git
cd library-management
npm install
npm run dev
```
#### Database access 
```bash
PORT=5000
"mongodb+srv://mongodb:mongodb@cluster0.qttac.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0"
```
## 📚 API Endpoints
### 1️⃣ Create a Book
#### method:  POST
#### end point : /api/books
#### 1. Creates a new book with all details (Must follow this format) : 
#### Request body: 
``` bash
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology.",
  "copies": 5,
  "available": true
}
```
#### Response body: 
``` bash
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

#### Error status: 
``` bash
{
    "message": "Validation failed",
    "success": false,
    "error": {
        "errors": {
            "copies": {
                "name": "ValidatorError",
                "message": "Path `copies` (-5) is less than minimum allowed value (0).",
                "properties": {
                    "message": "Path `copies` (-5) is less than minimum allowed value (0).",
                    "type": "min",
                    "min": 0,
                    "path": "copies",
                    "value": -5
                },
                "kind": "min",
                "path": "copies",
                "value": -5
            }
        },
        "_message": "Book validation failed",
        "name": "ValidationError",
        "message": "Book validation failed: copies: Path `copies` (-5) is less than minimum allowed value (0)."
    }
}
```
### 2️⃣ Get All Books (with Filter, Sort, Limit).
#### method:  GET
#### end point : /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
#### 2. Get all books and also get books using filter, sort and limit query : 

```base 
/api/books?filter=FANTASY&sortBy=title&sort=asc&limit=5
```
 
 ### 3️⃣ Get a book by id .
#### method:  GET
#### end point : /api/books/:bookId
#### 2. Get a single book by MongoDB Id from books collection

```base
/api/books/6857d1d8026e223064630198
```

 ### 4️⃣ Update a book by id .
#### method:  PATCH
#### end point : /api/books/:bookId
#### 2. Get a single book by MongoDB Id from books collection

```base
/api/books/6857d1d8026e223064630198
```

 ### 5️⃣ Delete a book by id .
#### method:  DELETE
#### end point : /api/books/:bookId
#### 2. Delete a book by Id

```base
/api/books/6857d1d8026e223064630198
```


 ### 6️⃣ Borrow a book .
#### method:  POST
#### end point : /api/borrow
#### This will : 
- Check if the book exists and has enough copies
- Deduct the borrowed quantity from available copies
-  Automatically mark the book as unavailable if copies reach 0
-  Create a borrow record
#### Request body: 
```base
    {
    "book": "6647a5f1c6c8b32a5c123abc",
    "quantity": 2,
    "dueDate": "2025-07-01"
    }
```
#### Response body
```base
{
  "success": true,
  "message": "Borrowed book successfully",
  "data": { ... }
}
```

 ### 7️⃣ Borrowed summery(Aggregation)
#### method:  GET
#### end point : /api/borrow
#### Response body : 
Returns a summary grouped by books with total quantity borrowed : 
```bash
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```







