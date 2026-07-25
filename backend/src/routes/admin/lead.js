import { Router } from "express";
import {
  changeLeadStatus,
  listLeads,
} from "../../controllers/admin/lead.js";
import { verifyAdminMod } from "../../middlewares/adminAuth.js";
import { zodValidator } from "../../middlewares/zod.js";
import {
  leadIdParams,
  leadListQuery,
  leadStatusUpdate,
} from "../../validators/admin/lead.js";

const router = Router();

router.use(verifyAdminMod);

router.get("", zodValidator(leadListQuery, "query"), listLeads);
router.patch(
  "/:id/status",
  zodValidator(leadIdParams, "params"),
  zodValidator(leadStatusUpdate),
  changeLeadStatus,
);

export default router;
