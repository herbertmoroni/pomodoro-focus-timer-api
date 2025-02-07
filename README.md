# Pomodoro Timer API

A RESTful API for managing Pomodoro tasks and sessions, helping users track their time and productivity efficiently.

## Features

- Create and manage tasks with detailed metadata
- Track individual Pomodoro sessions
- Generate time usage reports
- Flexible categorization system
- Session history and notes
- Swagger API documentation

## Data Structure

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

### PomodoroSessions Collection

Individual Pomodoro sessions linked to tasks:

| Field | Type | Description |
|-------|------|-------------|
| sessionId | ObjectId | Unique identifier |
| taskId | ObjectId | Reference to Tasks collection |
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
git clone https://github.com/yourusername/pomodoro-api.git
cd pomodoro-api
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
MONGODB_URI=mongodb://localhost:27017/pomodoro
PORT=3000
```

4. Generate Swagger documentation:
```bash
npm run swagger-autogen
```

5. Start the server:
```bash
npm start
```

### API Documentation

Access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

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

## Features and Capabilities

- **Task Management**: Store and organize tasks with rich metadata
- **Session Tracking**: Record individual Pomodoro sessions
- **Time Analytics**: Generate reports based on accumulated time
- **History**: Maintain complete session history
- **Categorization**: Flexible task categorization system
- **Notes**: Add reflections to completed sessions

## Database Support

The API supports multiple database backends through a service layer abstraction:

- MongoDB (default)
- AWS DynamoDB (configurable)
- Azure Cosmos DB (configurable)

Switch databases by updating the DB_TYPE environment variable:
```env
DB_TYPE=mongodb  # or dynamodb or cosmosdb
```
