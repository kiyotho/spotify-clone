# Spotify Clone

A fullstack music streaming app built from scratch in one week.

## Features

- User registration and login with JWT authentication
- Cookie-based auth with role-based access (User / Artist)
- Artists can upload music and album art via Imagekit
- Music player with queue, seeking, and auto-advance
- Volume control and live progress bar
- Persistent queue with currently playing highlight
- Logout

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT + cookie-parser
- bcryptjs for password hashing
- Imagekit for cloud storage
- Multer for file uploads

**Frontend**
- React
- Axios
- CSS
- React Router Dom

## Getting Started

1. Clone the repo
2. Create a `.env` file with your MongoDB URI, JWT secret, and Imagekit credentials
3. `npm install` in both backend and frontend directories
4. `npm run dev` to start both servers

## Notes

Built on day 50 of learning to code.
