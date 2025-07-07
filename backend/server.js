import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/task.js"
import ActionLog from "./models/ActionLogs.js";
import userRoutes from "./routes/userRoute.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors())
app.use(express.json());

app.use("/api/auth" , authRoutes)
app.use("/api/task" , taskRoutes)
app.use("/api/action-logs" , ActionLog)
app.use("/api/users" , userRoutes)

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server conneccted`);
  });
});