import jwt from "jsonwebtoken";

function verifyToken(token, secret) {
  if (!secret) {
    throw new Error("Secret not defined");
  }
  return jwt.verify(token, secret);
}

export default verifyToken;
