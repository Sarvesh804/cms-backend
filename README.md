# Content Management System (CMS) Backend

A RESTful backend service that allows users to create, view, update, delete, and list articles.  
Tracks and exposes the "recently viewed" articles per user using only primitives.

---

## Features

- **RESTful CRUD APIs** for managing articles
- **JWT-based authentication**
- **User-specific article isolation**
- **Pagination** for listing articles
- **Recently viewed articles** (no external libraries)
- **Database schema changelog management** with `node-pg-migrate`
- **Unit tests** using Jest and Supertest
- **Dockerized** with `docker-compose.yml`

---

## Tech Stack

- **Language**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Testing**: Jest
- **Migrations**: node-pg-migrate
- **Containerization**: Docker

---

## How to Run

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd cms-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
- Create .env file:

```bash
// Copy env.example, put actual credentials and save as .env
```


---
## Local Development
- Start PostgreSQL DB:

```bash
// Start DB manually or use another terminal
```

- Run the app:
```bash
npm run dev
```

- Apply migrations:

```bash
npx node-pg-migrate -m migrations up
```

---

## With Docker

- Build and run everything:

```bash
docker-compose up --build
```

---

## Run Tests

```bash
npm test
```

---

## API Endpoints
| Method | Route              | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/register`        | Register a new user          |
| POST   | `/login`           | Login and get JWT token      |
| GET    | `/articles`        | List paginated articles      |
| POST   | `/articles`        | Create an article            |
| GET    | `/articles/:id`    | Get an article               |
| PUT    | `/articles/:id`    | Update an article            |
| DELETE | `/articles/:id`    | Delete an article            |
| GET    | `/recently-viewed` | Get recently viewed articles |

---


## Bonus Points Implemented

- JWT Token-based auth – each user sees only their own articles
- Pagination for article list
- Database schema changelog management
- Unit tests
- Custom recently viewed logic using only primitives


## Folder Structure

```bash
cms-backend/
├── src/              # Application source code
├── migrations/       # DB schema migrations
├── __tests__/        # Unit tests
├── Dockerfile        # Docker image config
├── docker-compose.yml# Multi-container setup
└── README.md         # This file
```

### Author
Sarvesh Bajaj
sarveshbajaj804@gmail.com