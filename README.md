# Task Manager Pro

A full-stack task management application built with ReactJS, React Native, Node.js, Express, and MongoDB.

## 🚀 Features

### Backend
- ✅ RESTful API with Express.js
- ✅ JWT-based authentication
- ✅ MongoDB database with Mongoose
- ✅ Input validation with Joi
- ✅ Password hashing with bcrypt
- ✅ Clean folder structure (routes/controllers/models/middleware)
- ✅ Task CRUD operations
- ✅ Search, filter, and pagination support

### Web Frontend (ReactJS)
- ✅ User authentication (Login/Register)
- ✅ Protected routes
- ✅ Dashboard with task management
- ✅ Task CRUD operations
- ✅ Search and filter functionality
- ✅ Pagination
- ✅ Toast notifications
- ✅ Reusable components (TaskCard, Modal, Button)
- ✅ Material UI design
- ✅ Error boundary
- ✅ Skeleton loading states
- ✅ LocalStorage JWT handling

### Mobile App (React Native)
- ✅ User login
- ✅ Task list with FlatList
- ✅ Pull-to-refresh
- ✅ Create and update tasks
- ✅ Update task status
- ✅ AsyncStorage token persistence
- ✅ Navigation stack
- ✅ Search and filter
- ✅ Material Design with React Native Paper

## 📁 Project Structure

```
TaskManager App/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .gitignore
│   └── package.json
├── mobile/
│   ├── src/
│   │   ├── screens/
│   │   ├── context/
│   │   ├── services/
│   │   └── config/
│   ├── App.js
│   ├── app.json
│   ├── babel.config.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn
- For mobile: Expo CLI (`npm install -g expo-cli`)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Make sure MongoDB is running on your system or update `MONGODB_URI` with your MongoDB Atlas connection string.

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Web Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to `http://localhost:5000`):
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The web app will open at `http://localhost:3000`

### Mobile App Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `mobile/src/config/api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000'; // Replace with your computer's IP
```

**Note:** For mobile testing, you need to use your computer's IP address instead of `localhost`. Find your IP:
- **Windows:** `ipconfig` in CMD
- **Mac/Linux:** `ifconfig` in Terminal

4. Start the Expo development server:
```bash
npm start
```

5. Scan the QR code with:
   - **iOS:** Camera app
   - **Android:** Expo Go app

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

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
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

### Task Endpoints

All task endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Tasks
```http
GET /tasks?page=1&limit=10&search=project&status=pending&priority=high
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in title and description
- `status` (optional): Filter by status (pending, in-progress, completed)
- `priority` (optional): Filter by priority (low, medium, high)
- `sortBy` (optional): Field to sort by (default: createdAt)
- `sortOrder` (optional): Sort order (asc, desc - default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "in-progress"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes on backend
- Input validation with Joi
- CORS enabled for cross-origin requests
- Environment variables for sensitive data

## 🎨 UI/UX Features

- **Web:** Material UI components with responsive design
- **Mobile:** React Native Paper with native feel
- Toast notifications for user feedback
- Loading states and skeleton loaders
- Error boundaries for graceful error handling
- Pull-to-refresh on mobile
- Search and filter capabilities

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env - optional)
```
REACT_APP_API_URL=http://localhost:5000
```

## 🧪 Testing

### Test API Endpoints

You can test the API using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

### Sample cURL Commands

**Register:**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Tasks (replace TOKEN with actual token):**
```bash
curl -X GET http://localhost:5000/tasks \
  -H "Authorization: Bearer TOKEN"
```

## 🚀 Deployment

### Backend Deployment

1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Update `MONGODB_URI` in production environment
3. Set a strong `JWT_SECRET`
4. Deploy to platforms like:
   - Heroku
   - AWS
   - DigitalOcean
   - Railway
   - Render

### Web Deployment

Deploy the React app to:
- Vercel
- Netlify
- AWS Amplify
- Firebase Hosting

Remember to set `REACT_APP_API_URL` to your production backend URL.

### Mobile Deployment

Build the mobile app using:
```bash
expo build:android
expo build:ios
```

Or use EAS Build for better control.

## 📚 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Joi
- CORS
- dotenv

### Web Frontend
- React 18
- React Router DOM
- Material UI
- Axios
- React Hot Toast
- Context API

### Mobile
- React Native
- Expo
- React Navigation
- React Native Paper
- AsyncStorage
- Axios

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built as a full-stack developer machine test project.

## 🙏 Acknowledgments

- Material UI for React components
- React Native Paper for mobile UI
- MongoDB for database
- All open-source contributors

---

**Note:** Make sure to update the API URLs in the mobile app configuration when testing on a physical device. Use your computer's IP address instead of `localhost`.

