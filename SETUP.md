# Quick Setup Guide

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] npm or yarn installed
- [ ] For mobile: Expo CLI (`npm install -g expo-cli`)

## Step-by-Step Setup

### 1. Clone or Download the Project

```bash
cd "TaskManager App"
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your MongoDB URI
npm run dev
```

Backend should now be running on `http://localhost:5000`

### 3. Setup Web Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Web app should open at `http://localhost:3000`

### 4. Setup Mobile App

Open a new terminal:

```bash
cd mobile
npm install
```

Update `mobile/src/config/api.js` with your IP address:
```javascript
const API_BASE_URL = 'http://192.168.1.XXX:5000'; // Your computer's IP
```

Start Expo:
```bash
npm start
```

Scan QR code with Expo Go app on your phone.

## Testing the Application

1. **Register a new account** on web or mobile
2. **Login** with your credentials
3. **Create tasks** using the "Create Task" button
4. **Search and filter** tasks
5. **Update task status** and priority
6. **Delete tasks** as needed

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod` or check MongoDB service
- For MongoDB Atlas, verify connection string in `.env`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Web: Change port with `PORT=3001 npm start`

### Mobile App Can't Connect
- Make sure your phone and computer are on the same network
- Use your computer's IP address, not `localhost`
- Check firewall settings

### CORS Errors
- Backend CORS is configured for `localhost:3000`
- For production, update CORS settings in `backend/server.js`

## Next Steps

- Review the full [README.md](README.md) for detailed documentation
- Check API documentation for endpoint details
- Customize the UI/UX to your preferences
- Deploy to production when ready

