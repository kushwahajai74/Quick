import express from 'express';
const router = express.Router();
import { body } from 'express-validator'
import CaptainController from '../controllers/CaptainController.js';
import authMiddleware from '../middlewares/auth.js';

router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], CaptainController.signupCaptain);

router.post('/signin', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], CaptainController.signinCaptain);

router.get('/profile', authMiddleware.authCaptain, CaptainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, CaptainController.logoutCaptain);

export default router;