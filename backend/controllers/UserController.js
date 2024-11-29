import User from '../models/User.js';
import {validationResult} from 'express-validator';

export const signupUser = async (req, res, next) => {
   try {
       const errors = validationResult(req);

       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }

       const { fullName, email, password } = req.body;

       const hashedPassword = await User.hashPassword(password);

       const user = await User.create({
           fullName: {
               firstName: fullName.firstName,
               lastName: fullName.lastName
           },
           email,
           password: hashedPassword
       });
       console.log(hashedPassword);

       const token = await user.generateAuthToken();
       res.status(201).json({ user, token });
   } catch (error) {
        next(error);
   }
};