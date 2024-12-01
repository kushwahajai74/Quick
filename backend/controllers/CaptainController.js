import BlackListedToken from '../models/BlackListedToken.js';
import Captain from '../models/Captain.js';
import { validationResult } from 'express-validator';

const signupCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, vehicle} = req.body;

        const isCaptainAlreadyExist = await Captain.findOne({ email });

        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: 'Captain already exist' });
        }

        const hashedPassword = await Captain.hashPassword(password);
        const captain = await Captain.create({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName
            },
            email,
            password: hashedPassword,
            vehicle
        });

        const token = await captain.generateAuthToken();
        res.status(201).json({captain, token });
    } catch (error) {
        next(error);
    }
};

const signinCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const captain = await Captain.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const token = await captain.generateAuthToken();
        res.status(200).json({ captain, token });
    } catch (error) {
        next(error);
    }
};

const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
};

const logoutCaptain = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        await BlackListedToken.create({ token });

        return res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (error) {
        next(error);
    }
};

export default { signupCaptain, signinCaptain, getCaptainProfile, logoutCaptain };