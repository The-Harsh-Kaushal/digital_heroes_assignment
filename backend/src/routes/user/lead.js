import e from "express";
import { zodValidator } from "../../middlewares/zod.js";
import { leadCreation } from "../../validators/lead.js";
import { createLead } from "../../controllers/user/lead.js";

const router = e.Router();

router.post("", zodValidator(leadCreation), createLead);

export default router;
