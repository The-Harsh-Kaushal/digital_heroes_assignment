import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./database/db.js";
import errorHandler from "./middlewares/error.js";
import adminRoutes from "./routes/admin/index.js";
import userRoutes from "./routes/user/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public/dist")));

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

app.use(errorHandler);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist", "index.html"));
});

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
