# StudiesVerse

A full-stack study companion app — browse academic subjects, read study notes, and manage your profile behind a JWT-authenticated login.

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt password hashing
- **Frontend**: React 19, Vite, React Router

## Project structure

```
studies-verse/
├── backend/     Express API (auth, profile, subjects, notes)
└── frontend/    React + Vite client
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a connection string to a remote instance)

## Backend setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in your own values
npm run dev            # starts on http://localhost:5000 (nodemon)
```

Environment variables (`backend/.env`):

| Variable | Description |
| --- | --- |
| `PORT` | Port the API listens on (default `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs — use a long random value |

## Frontend setup

```bash
cd frontend
npm install
npm run dev   # starts on http://localhost:5173 (or next free port)
```

The frontend expects the API at `http://localhost:5000/api`.

## API endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/register` | — | Create a new user |
| POST | `/api/login` | — | Log in, returns a JWT |
| GET | `/api/profile` | ✅ | Get the logged-in user's profile |
| GET | `/api/subjects` | ✅ | List available subjects |
| GET | `/api/notes` | ✅ | List study notes (optional `?subjectId=`) |

Authenticated requests must send `Authorization: Bearer <token>`.
