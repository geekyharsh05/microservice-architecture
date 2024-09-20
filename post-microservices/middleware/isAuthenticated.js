import verifyToken from "../utils/verifyToken.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const payload = await verifyToken(token, process.env.REFRESH_TOKEN_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not authenticated" });
  }
};

export default isAuthenticated;
