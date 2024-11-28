import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "Last name must be at least 3 characters long"]
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

userSchema.methods.hashPassword = async function() {
    this.password = await bcrypt.hash(this.password, 10);
};
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.hashPassword();
});
userSchema.methods.getFullName = function() {
    return `${this.name.firstName} ${this.name.lastName}`;
};
userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const User = mongoose.model("User", userSchema);

export default User;