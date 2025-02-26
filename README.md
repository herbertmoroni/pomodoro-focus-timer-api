# Pomodoro Timer API

A RESTful API for managing Pomodoro tasks and sessions, helping users track their time and productivity efficiently.

## Table of Contents

- [Features](#features)
- [Data Structure](#data-structure)
  - [Users Collection](#users-collection)
  - [Tasks Collection](#tasks-collection)
  - [PomodoroSessions Collection](#pomodoro-sessions-collection)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Tasks](#tasks)
  - [Sessions](#sessions)
- [Dependencies](#dependencies)
- [Features and Capabilities](#features-and-capabilities)

## Features

- Create and manage tasks with detailed metadata
- Track individual Pomodoro sessions
- Generate time usage reports
- Flexible categorization system
- Session history and notes
- Swagger API documentation

## Data Structure

### Users Collection

Users are the main entities that interact with the system. Each user contains:

| Field | Type | Description |
|-------|------|-------------|
| firebaseUid | String | Unique identifier from Firebase |
| email | String | User's email address |
| displayName | String | User's display name |
| settings | Object | User-specific settings |
| settings.defaultPomodoroLength | Number | Default Pomodoro duration in seconds |
| settings.defaultBreakLength | Number | Default break duration in seconds |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last update timestamp |

### Tasks Collection

Tasks are the main entities that users work on. Each task contains:

| Field | Type | Description |
|-------|------|-------------|
| taskId | ObjectId | Unique identifier |
| taskName | String | Name/label of the task |
| description | String | Optional detailed description |
| totalTimeSpent | Number | Accumulated time in seconds |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last update timestamp |
| category | String | Task grouping category |
| isActive | Boolean | Soft delete flag |
| defaultDuration | Number | Preferred Pomodoro duration in seconds |
| userId | ObjectId | Reference to Users collection |

### PomodoroSessions Collection

Individual Pomodoro sessions linked to tasks:

| Field | Type | Description |
|-------|------|-------------|
| sessionId | ObjectId | Unique identifier |
| taskId | ObjectId | Reference to Tasks collection |
| userId | ObjectId | Reference to Users collection |
| startTime | Date | Session start timestamp |
| duration | Number | Session duration in seconds |
| completed | Boolean | Session completion status |
| notes | String | Optional session reflections |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/herbertmoroni/pomodoro-focus-timer-api.git
cd pomodoro-focus-timer-api
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
MONGODB_URI=mongodb://localhost:27017/pomodoro
PORT=3000
NODE_ENV=development

# Firebase credentials
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_API_KEY=your-firebase-api-key
```

4. Start the server:
```bash
npm start
```

### Environment Variables

The following environment variables are required to run the application:

- `MONGODB_URI`: The URI for connecting to MongoDB.
- `PORT`: The port on which the server will run.
- `NODE_ENV`: The environment in which the server is running (e.g., development, production).
- `FIREBASE_PROJECT_ID`: The Firebase project ID.
- `FIREBASE_CLIENT_EMAIL`: The Firebase client email.
- `FIREBASE_PRIVATE_KEY`: The Firebase private key.
- `FIREBASE_API_KEY`: The Firebase API key.

### API Documentation

Access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login with existing credentials
- `GET /auth/me` - Get current user profile

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Sessions

- `GET /api/sessions` - Get all sessions
- `POST /api/sessions` - Create a new session
- `GET /api/sessions/:id` - Get session by ID
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

## Dependencies

- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express applications.
- **dotenv**: Module for loading environment variables from a `.env` file into `process.env`.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **express-validator**: A set of express.js middlewares that wraps validator.js validator and sanitizer functions.
- **firebase-admin**: Firebase Admin SDK for managing Firebase services programmatically.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **swagger-jsdoc**: Generates swagger specification from JSDoc comments.
- **swagger-ui-express**: Middleware to serve auto-generated swagger-ui generated API docs.

## Features and Capabilities

- **Task Management**: Store and organize tasks with rich metadata
- **Session Tracking**: Record individual Pomodoro sessions
- **Time Analytics**: Generate reports based on accumulated time
- **History**: Maintain complete session history
- **Categorization**: Flexible task categorization system
- **Notes**: Add reflections to completed sessions

