import express from 'express';
const router = express.Router();
import {body} from 'express-validator'
import { signupUser } from '../controllers/UserController.js';


router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),

], signupUser);

export default router;