import express from 'express'
import getUserDetails from '../controller/userController.js'
import protectRoute from '../middleware/protectRoute.js'

const route = express.Router()

route.get('/details',protectRoute,getUserDetails.getUser)

export default route


