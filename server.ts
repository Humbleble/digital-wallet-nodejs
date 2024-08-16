import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './user-service/routes';
import errorMiddleware from './user-service/middleware/error.middleware';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri: string = process.env.MONGODB_URI as string;

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', routes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;