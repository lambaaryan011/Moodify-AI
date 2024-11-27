import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { config } from './config';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('mood_update', (data) => {
    // Handle mood updates and potentially trigger music recommendations
    console.log('Mood update received:', data);
    // In a production environment, you would:
    // 1. Process the mood data
    // 2. Query music recommendations
    // 3. Emit recommendations back to the client
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Start server
httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});