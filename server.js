import express from 'express';
import dotenv, { config } from 'dotenv'

import dbConnected from './db/db.js'
import authRoute from './routes/authRoute.js';

const app = express();

config()
dbConnected()

app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/auth',authRoute)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});