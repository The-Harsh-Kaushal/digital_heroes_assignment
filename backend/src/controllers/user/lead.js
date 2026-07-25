import Lead from "../../models/lead.js";
import { sendSuccess } from "../../utils/response.js";

export const createLead = async (req, res) => {
  const { name, email, budget, message } = req.body;
  await Lead.create({
    name,
    email,
    budget,
    message,
  });
  return sendSuccess({ res, message: "Lead submitted successfully" });
};
