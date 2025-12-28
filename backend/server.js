const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Task Manager API is running' });
});

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ Error: JWT_SECRET is not set in .env file');
  console.log('Please create a .env file with JWT_SECRET in the backend folder');
  process.exit(1);
}

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🌐 API: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n📝 Please check your MongoDB connection:');
    console.log('   1. Is MongoDB running locally? (mongod)');
    console.log('   2. Is your MONGODB_URI correct in .env file?');
    console.log('   3. For MongoDB Atlas, check your connection string\n');
    process.exit(1);
  });

module.exports = app;

