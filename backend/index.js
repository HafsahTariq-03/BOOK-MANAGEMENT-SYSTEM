import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';
import dotenv from 'dotenv';

// Configure dotenv to load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODB_URL;

const app = express();

app.use(
  cors({
    origin: 'http://44.201.103.207', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  })
);

app.use(express.json()); 

app.get('/', (req, res) => {
  console.log('Incoming request:', req.method, req.url);
  return res.status(200).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(' Connected to MongoDB');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(` Server running at http://${process.env.PUBLIC_IP || '44.201.103.207'}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' MongoDB Connection Error:', error.message);
    process.exit(1); 
  });
