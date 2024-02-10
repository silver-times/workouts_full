import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "../routes/user";
import { workoutRouter } from "../routes/workout";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("server works 🚀✨");
});

app.use("/api/users", userRouter);
app.use("/api/workouts", workoutRouter);

app.listen(PORT, async () => {
  try {
    console.log(`Server running on port ${PORT} 🚀`);
    console.log(`Database connected 📚✨`);
  } catch (error) {
    console.log(error);
  }
});
