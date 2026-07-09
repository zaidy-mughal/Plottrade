import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoutes from './routes/user.route.js';
import AuthRoutes from './routes/auth.route.js';
import ListingRoutes from './routes/listing.route.js';

import path from 'path';
const __dirname = path.resolve();

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();

// enabling CORS
const allowedOrigins = process.env.CLIENT_URL.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// logging every request made to the server in the console
app.use(morgan('dev'));

// parse incoming requests with JSON payloads
app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

app.use('/api/user', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/listings', ListingRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});