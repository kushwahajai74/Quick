import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    socektId: {
        type: String
    },
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getFullName = function() {
    return `${this.fullName.firstName} ${this.fullName.lastName}`;
};
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

const User = mongoose.model("User", userSchema);

export default User;