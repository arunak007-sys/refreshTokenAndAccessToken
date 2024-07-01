import express from 'express';
import { config } from 'dotenv'
import cookieParser from 'cookie-parser';

import dbConnected from './db/db.js'
import authRoute from './routes/authRoute.js'
import tokenRoutes from './routes/tokenRoute.js'
import userRoute from './routes/userRoute.js'

const app = express();

config()
dbConnected()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.use('/api/auth',authRoute)
app.use('/api/token',tokenRoutes)
app.use('/api/user',userRoute)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
});