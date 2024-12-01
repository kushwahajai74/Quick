import BlackListedToken from '../models/BlackListedToken.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

const signupUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        const isUserAlreadyExist = await User.findOne({ email});
        
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashedPassword = await User.hashPassword(password);

        const user = await User.create({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName
            },
            email,
            password: hashedPassword
        });

        const token = await user.generateAuthToken();
        res.status(201).json({ user: { email: user.email, fullName: user.getFullName() }, token });
    } catch (error) {
        next(error);
    }
};

const signinUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const token = await user.generateAuthToken();
        res.status(200).json({ user: { email: user.email, fullName: user.getFullName() }, token });
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

const logoutUser = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        await BlackListedToken.create({ token });

        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        next(error);
    }
};

export default { signupUser, signinUser, getUserProfile, logoutUser };