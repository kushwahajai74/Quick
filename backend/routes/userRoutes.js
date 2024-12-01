import express from 'express';
const router = express.Router();
import {body} from 'express-validator'
import UserController from '../controllers/UserController.js';
import authUser from '../middlewares/auth.js';



router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),

], UserController.signupUser);

router.post('/signin',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], UserController.signinUser);

router.get('/profile', authUser, UserController.getUserProfile);

router.get('/logout', authUser, UserController.logoutUser);

export default router;