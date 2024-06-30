import express from 'express';
import refreshToken from '../controller/refreshToken.js';

const route = express.Router()

route.post('/refreshToken',refreshToken.refreshToken)
route.delete('/deleteToken',refreshToken.deleteRefreshToken)

export default route;