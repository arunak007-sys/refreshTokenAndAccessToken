import express from 'express';
import auth from '../controller/auth.js';
const route = express.Router()

route.post('/signup',auth.signUp)
route.post('/login',auth.login)

export default route;