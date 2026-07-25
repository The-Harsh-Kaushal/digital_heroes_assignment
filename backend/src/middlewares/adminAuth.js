import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import { ForbiddenError, UnauthorizedError } from "../utils/error.js";

const jwtSecret = process.env.JWT_SECRET || "harshkaushal";
const getToken = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return req.headers["x-auth-token"];
};

export const verifyAdminMod = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    throw new UnauthorizedError("Access token is required");
  }

  const decoded = jwt.verify(token, jwtSecret);
  const lookup = [];

  if (decoded.id) {
    lookup.push({ _id: decoded.id });
  }

  if (decoded.email) {
    lookup.push({ email: decoded.email });
  }

  if (!lookup.length) {
    throw new UnauthorizedError("Invalid admin token");
  }

  const admin = await Admin.findOne({ $or: lookup }).select("-password");

  if (!admin) {
    throw new UnauthorizedError("Invalid admin token");
  }

  req.admin = admin;
  next();
};
