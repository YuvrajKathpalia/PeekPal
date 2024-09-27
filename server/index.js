import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.URL,
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});
