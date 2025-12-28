# Task Manager Pro

A full-stack task management application with web and mobile interfaces, built with React, React Native, Node.js, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)

## ✨ Features

### Web Application
- User authentication (Register, Login, Forgot Password, Reset Password)
- Create, Read, Update, Delete tasks
- Search and filter tasks by status
- Task status management (Pending, In Progress, Completed)
- Priority levels (Low, Medium, High)
- Due date tracking
- Responsive Material-UI design

### Mobile Application
- Full authentication flow
- Task list with FlatList for efficient rendering
- Pull-to-refresh functionality
- Create, update, delete tasks
- Task status cycling (tap to change status)
- Search and filter capabilities
- Modern React Native Paper UI

### Backend
- RESTful API
- JWT authentication
- Password encryption with bcrypt
- Security questions for password recovery
- MongoDB database
- Input validation with Joi

## 🛠 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Joi (Validation)

### Web Frontend
- React.js
- React Router DOM
- Material-UI (MUI)
- Axios
- React Context API

### Mobile
- React Native
- Expo
- React Navigation
- React Native Paper
- AsyncStorage
- Axios

## 📁 Project Structure

```
TaskManager App/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & validation middleware
│   └── server.js           # Entry point
│
├── web/                    # React web application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context providers
│   │   ├── services/       # API services
│   │   └── config/         # Configuration
│   └── public/             # Static files
│
└── mobile/                 # React Native mobile app
    └── src/
        ├── screens/        # Screen components
        ├── context/        # Context providers
        ├── services/       # API services
        └── config/         # Configuration
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git
- For mobile: Expo Go app on your phone (optional)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd TaskManager-App
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Add the following variables:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# JWT_EXPIRE=7d
# PORT=5000

# Example .env file:
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
PORT=5000

# Start the server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Web Application Setup

```bash
cd web

# Install dependencies
npm install

# Create .env file
# Add the following:
REACT_APP_API_URL=http://localhost:5000

# Start the development server
npm start
```

The web app will open at `http://localhost:3000`

### 4. Mobile Application Setup

```bash
cd mobile

# Install dependencies
npm install

# Update API URL in src/config/api.js
# Change to your computer's IP address:
# const API_BASE_URL = 'http://YOUR_IP:5000';

# Start Expo development server
npm start

# Scan QR code with Expo Go app (Android/iOS)
# Or press 'a' for Android emulator, 'i' for iOS simulator
```

**Note**: For mobile testing, ensure:
- Your phone and computer are on the same Wi-Fi network
- Update `mobile/src/config/api.js` with your computer's IP address
- Backend server is running and accessible

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication

All task endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

### 1. Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "securityQuestion": "What was the name of your first pet?",
  "securityAnswer": "Fluffy"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
}
```

---

### 2. Login

**POST** `/auth/login`

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
}
```

---

### 3. Forgot Password

**POST** `/auth/forgot-password`

Request password reset token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "securityAnswer": "Fluffy"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link generated successfully",
  "data": {
    "resetToken": "reset_token_here",
    "resetUrl": "http://localhost:3000/reset-password/reset_token_here",
    "email": "john@example.com"
  }
}
```

---

### 4. Reset Password

**POST** `/auth/reset-password`

Reset password using token.

**Request Body:**
```json
{
  "token": "reset_token_here",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### 5. Get All Tasks

**GET** `/tasks`

Get all tasks for the authenticated user.

**Query Parameters:**
- `search` (optional): Search in title and description
- `status` (optional): Filter by status (pending, in-progress, completed)
- `priority` (optional): Filter by priority (low, medium, high)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): Sort order (asc/desc, default: desc)

**Example:**
```
GET /tasks?status=pending&priority=high&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "_id": "task_id",
        "title": "Complete project",
        "description": "Finish the task management app",
        "status": "in-progress",
        "priority": "high",
        "dueDate": "2024-12-31T00:00:00.000Z",
        "userId": "user_id",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pages": 1
  }
}
```

---

### 6. Get Single Task

**GET** `/tasks/:id`

Get a single task by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 7. Create Task

**POST** `/tasks`

Create a new task.

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Note:** All fields except `description` and `dueDate` are optional. Default values:
- `status`: "pending"
- `priority`: "medium"
- `dueDate`: null

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 8. Update Task

**PUT** `/tasks/:id`

Update an existing task.

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2024-12-31"
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "task_id",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "in-progress",
    "priority": "medium",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

### 9. Delete Task

**DELETE** `/tasks/:id`

Delete a task by ID.

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

### Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

**Common Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Internal Server Error

---

## 📸 Screenshots

### Web Application

#### Login Page
![Login Page](screenshots/web-login.png)
*User login interface with email and password*

#### Dashboard
![Dashboard](screenshots/web-dashboard.png)
*Main dashboard showing all tasks with search and filter options*

#### Task Form
![Task Form](screenshots/web-task-form.png)
*Create/Edit task form with all task details*

---

### Mobile Application

#### Login Screen
![Mobile Login](screenshots/mobile-login.png)
*Mobile login screen with Material Design UI*

#### Task List
![Mobile Task List](screenshots/mobile-task-list.png)
*Task list with pull-to-refresh and filter options*

#### Task Details
![Mobile Task Form](screenshots/mobile-task-form.png)
*Task creation/editing screen on mobile*

---

**Note:** To add screenshots:
1. Create a `screenshots` folder in the root directory
2. Add your screenshot images (PNG or JPG format)
3. Update the image paths in this README
4. Recommended sizes: 1280x720 for web, 375x667 for mobile

---

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Security questions for password recovery
- Input validation and sanitization
- Protected API routes
- CORS configuration

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Keerthi Krishna**
- Email: keerthikrishna920@gmail.com

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

## 📞 Support

For support, email keerthikrishna920@gmail.com or open an issue in the repository.

---

**Happy Task Managing! 🎉**
