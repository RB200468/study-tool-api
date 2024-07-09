# Study Tool REST API

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

## Configuration

Create a `.env` file in the root of your project and add the following environment variables:

```sh
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

### Authentication

- `POST /auth/login` - Login user and get a token

### User

- `GET /users/` - All users
- `GET /users/:id` - Get user by ID
- `POST /users/register/` - Register new user
- `DELETE /users/:id` - Delete user by ID

### Deck

- `GET /deck/` - Get all decks of current authed user
- `GET /deck/:id` - Get flashcards of current authed user by deck ID
- `POST /deck/` - Create new deck for current authed user
- `DELETE /deck/:id` - Delete deck of current authed user by ID

### Flashcard

- `POST /flashcards/:id` - Create a flashcard in current authed user's deck by deck ID
- `DELETE /flashcard/:id` - Delete a flashcard in current authed user's deck by deck ID and flashcard ID

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
