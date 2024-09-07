import jwt from "jsonwebtoken";

function generateToken(payload) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? "2000s",
  });
}

export default generateToken;
