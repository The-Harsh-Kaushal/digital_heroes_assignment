import { Router } from "express";
import { login } from "../../controllers/admin/auth.js";
import { zodValidator } from "../../middlewares/zod.js";
import { adminLogin } from "../../validators/admin/auth.js";

const router = Router();

router.post("", zodValidator(adminLogin), login);

export default router;
