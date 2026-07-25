import fs from "fs";
import path from "path";
import { Router } from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
try {
  const files = fs.readdirSync(__dirname).filter((file) => file != "index.js");

  for (const file of files) {
    const module = await import(`./${file}`);
    router.use(`/${path.parse(file).name}`, module.default);
  }
} catch (error) {
  console.log("error occurred in src/routes/admin/index.js", error.message);
  console.log(error);
  process.exit(1);
}

export default router;
