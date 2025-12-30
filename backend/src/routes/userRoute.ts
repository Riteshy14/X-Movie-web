import { Router } from 'express'
import { getUser, signin, signup } from '../controller/userController.js';
import { Userauth } from '../middleware/userAuth.js';

const UserRouter = Router();

UserRouter.post('/signup',signup)
UserRouter.post('/signin',signin)
UserRouter.get('/profile',Userauth,getUser)

export default UserRouter;