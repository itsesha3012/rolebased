import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
