import prisma from "../db/db.config.js";
import verifyToken from "../utils/verifyToken.js";
import dotenv from "dotenv";

dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decodedUser = verifyToken(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decodedUser?.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Not authenticated" });
  }
};

export default isAuthenticated;
