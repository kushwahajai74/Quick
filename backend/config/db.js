import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`MongoDB Connected to host: ${conn.connection.host} 💾`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

export default connectDB;