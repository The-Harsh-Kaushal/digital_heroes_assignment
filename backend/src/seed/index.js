import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";

try {
  await mongoose.connect(process.env.MONGOURI);
  console.log("connected to DB successfully");

  const admin = await Admin.findOne({
    role: "admin",
  });

  if (admin) {
    console.log("There's already an Admin");
    await mongoose.disconnect();
    process.exit(0);
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("please enter an email and password for admin account");
    await mongoose.disconnect();
    process.exit(1);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    email,
    password: hashedPassword,
    role: "admin",
  });
  console.log("The admin account is successfully created ");
} catch (error) {
  console.log("Error while creating Admin ", error.message);
  console.log(error);
} finally {
  await mongoose.disconnect();
}
