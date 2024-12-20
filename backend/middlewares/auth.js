import BlackListedToken from "../models/BlackListedToken.js";
import Captain from "../models/Captain.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized Request' });
        }

        const BlackListed = await BlackListedToken.findOne({ token });
        if (BlackListed) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        req.user = { user };
        return next();
    } catch (error) {
        return next(error);
    }
};

const authCaptain = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized Request' });
        }

        const BlackListed = await BlackListedToken.findOne({ token });
        if (BlackListed) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captainId = decoded._id;
        const captain = await Captain.findById(captainId);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        req.captain = { captain };
        return next();
    } catch (error) {
        return next(error);
    }
};

export default { authUser, authCaptain };