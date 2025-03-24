import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';
import { PORT, mongoDBURL } from './config.js';

const app = express();

app.use(
  cors({
    origin: 'http://34.226.249.134', 
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
      console.log(` Server running at http://${process.env.PUBLIC_IP || '34.226.249.134'}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' MongoDB Connection Error:', error.message);
    process.exit(1); 
  });
