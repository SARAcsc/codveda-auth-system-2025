// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// CORS
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3000']
}));

app.use(express.json());

// === MONGOOSE CONNECTION (FIXED FOR MONGOOSE 8+) ===
console.log('Connecting to MongoDB...');
// Provide sensible defaults for local development and warn if not set
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codveda-auth';
if (!process.env.MONGODB_URI) {
  console.warn('Warning: MONGODB_URI not set in environment. Falling back to local MongoDB at', MONGODB_URI);
}

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET not set in environment. Using a development default. Do NOT use in production.');
  process.env.JWT_SECRET = 'dev_jwt_secret_change_me';
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
.then(() => {
  console.log('MongoDB Connected Successfully!');
})
.catch(err => {
  console.error('DB Connection Failed:', err.message);
  // Do not exit immediately; keep process alive so developer can read message and fix .env
});

mongoose.connection.on('connected', () => console.log('Mongoose connected'));
mongoose.connection.on('error', err => console.error('Mongoose error:', err));

// === ROUTES ===
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Auth API is running! Go to /api/auth/register');
});

const PORT = Number(process.env.PORT) || 5000;

// Attempt to start the server; if the port is in use, try the next port
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      // try next port
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);