import express from 'express';
const router = express.Router();
import { body } from 'express-validator'
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/auth.js';

router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

], UserController.signupUser);

router.post('/signin', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], UserController.signinUser);

router.get('/profile', authMiddleware.authUser, UserController.getUserProfile);

router.get('/logout', authMiddleware.authUser, UserController.logoutUser);

export default router;