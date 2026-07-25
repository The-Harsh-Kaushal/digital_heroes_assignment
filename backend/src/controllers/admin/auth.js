import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendSuccess } from "../../utils/response.js";
import { NotFoundError, UnauthorizedError } from "../../utils/error.js";
import Admin from "../../models/admin.js";

const jwt_secret = process.env.JWT_SECRET || "harshkaushal";
const token_age = process.env.ACCESS_AGE || "7d";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const mod = await Admin.findOne({
    email,
  });
  if (!mod) {
    throw new NotFoundError("NO such mod exists");
  }
  const isMatch = await bcrypt.compare(password, mod.password);
  if (!isMatch) {
    throw new UnauthorizedError("Wrong Password!");
  }
  const payload = {
    id: mod._id,
    email: mod.email,
    role: mod.role,
  };
  const accessToken = jwt.sign(payload, jwt_secret, {
    expiresIn: token_age,
  });
  return sendSuccess({
    res,
    message: "Login successful",
    data: { accessToken },
  });
};
