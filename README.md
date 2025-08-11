# Momentro Backend

This repository contains the backend API for **Momentro**, a productivity and habit tracking application designed to help users organize their time and build effective habits.

## Features

- User authentication (signup, login) with JWT
- CRUD operations for habits and timeslots
- Secure routes accessible only to authenticated users
- Integration with PostgreSQL via Sequelize ORM
- RESTful API endpoints to manage user data and habits

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment variable management

## Project structure
```
momentro-backend/
├─ middleware/
│ ├─ authenticate.js
│ └─ authMiddleware.js
├─ models/
│ ├─ Habit.js
│ ├─ TimeSlot.js
│ ├─ User.js
│ └─ index.js
├─ node_modules/
├─ routes/
│ ├─ auth.js
│ ├─ habits.js
│ └─ timetable.js
├─ .env
├─ .gitignore
├─ package-lock.json
├─ package.json
└─ server.js
```

### Prerequisites

- Node.js (v14 or above)
- PostgreSQL database
- Git

