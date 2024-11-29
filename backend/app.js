import express from "express";
import cors from "cors";
const app = express();
import userRoutes from "./routes/userRoutes.js";
import ErrorHandler from "./middlewares/ErrorHandler.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(ErrorHandler);
export default app;