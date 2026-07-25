import "dotenv/config";

import express from "express";
import cors from "cors";
import { connectDB } from "./database/db.js";
import errorHandler from "./middlewares/error.js";
import adminRoutes from "./routes/admin/index.js";
import userRoutes from "./routes/user/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "health is good",
  });
});
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my small project !");
});

app.use(errorHandler);

try {
  await connectDB();
  const port = process.env.PORT || "5001";
  app.listen(port, () => {
    console.log("App is running at port ", port);
  });
} catch (error) {
  console.log("Error while starting up : ", error.message);
  console.log(error);
  process.exit(1);
}
