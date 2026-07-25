import Lead from "../../models/lead.js";
import { NotFoundError } from "../../utils/error.js";
import { sendSuccess } from "../../utils/response.js";

export const listLeads = async (req, res) => {
  const { status, page, limit } = req.validatedQuery;
  const filter = {};

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;
  const [leads, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Lead.countDocuments(filter),
  ]);

  return sendSuccess({
    res,
    message: "Leads fetched successfully",
    data: {
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    },
  });
};

export const changeLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const lead = await Lead.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );

  if (!lead) {
    throw new NotFoundError("Lead not found");
  }

  return sendSuccess({
    res,
    message: "Lead status updated successfully",
    data: { lead },
  });
};
