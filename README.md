# Study Tool REST API

Currently in development, subject to changes and improvement.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This REST API provides the backend functionality for a study tool front end. It facilitates the creation, retrieval, updating, and deletion of study materials, such as flashcards, quizzes, and study schedules.

## Features

- CRUD operations for study materials
- User authentication and authorization

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/RB200468/study-tool-api
   ```
2. Navigate to the project directory:
   ```sh
   cd study-tool-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (see [Configuration](#configuration)).

5. Start the development server:
   ```sh
   npm run dev
   ```

# Configuration

Create a `.env` file in the root of your project and add the following environment variables:

```sh
NODE_ENV=your_node_environment

DB_CONNECTION_STRING=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

PORT=your_preferred_port
```

# Usage

### Running the server

To start the server in development mode:

```sh
npm run dev
```

To start the server in production mode:

```sh
npm start
```

# Endpoints

### Admin

- `POST /api/v1/admins/register` - Register new user or admin
- `GET /api/v1/admins/users` - Get all users
- `PATCH /api/v1/admins/users/:id` - Update user credentials by ID
- `DELETE /api/v1/admins/users/:id` - Delete user by ID
- `GET /api/v1/admins/users/:id/decks` - Get decks given user ID
- `GET /api/v1/admins/users/:id/decks/:deck_id` - Get deck given user ID and deck ID
- `POST /api/v1/admins/users/:id/decks` - Create deck given user ID
- `PATCH /api/v1/admins/users/:id/decks/:deck_id` - Update deck name given user ID and deck ID
- `DELETE /api/v1/admins/users/:id/decks/:deck_id` - Delete deck by user ID and deck ID
- POST `http://localhost:5001/api/v1/admins/users/:id/decks/:deck_id` - Create flashcard given user ID and deck ID

### Authentication

- `POST /api/v1/auth/login` - Login user and get a token
- `POST /api/v1/auth/register/` - Register new user

### User

- `GET /api/v1/users/` - Get current user object
- `DELETE /api/v1/users/:id` - Delete user by ID

### Deck

- `GET /api/v1/decks/` - Get all decks of current authed user
- `GET /api/v1/decks/:id` - Get flashcards of current authed user by deck ID
- `POST /api/v1/decks/` - Create new deck for current authed user
- `DELETE /api/v1/decks/:id` - Delete deck of current authed user by ID

### Flashcard

- `POST /api/v1/flashcards/:id` - Create a flashcard in current authed user's deck by deck ID
- `DELETE /api/v1/flashcards/:id` - Delete a flashcard in current authed user's deck by deck ID and flashcard ID

# Authentication

This API uses JWT (JSON Web Tokens) for authentication. You need to include the token in the `Authorization` header of your requests:

```makefile
Authentication: Bearer <your_token>
```

# Error Handling

Errors are returned in the following format:

```json
{
  "message": "Error message"
}
```

Common error codes include:

- `400` - Bad request
- `401` - Unauthorised
- `404` - Not found
- `500` - Internal server error

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# Contact

If you have any questions or suggestions, feel free to reach out:

- Email: ryan.bendall@outlook.com
- GitHub: [RB200468](https://github.com/RB200468)
