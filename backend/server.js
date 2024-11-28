import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 3000;

await connectDB();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});