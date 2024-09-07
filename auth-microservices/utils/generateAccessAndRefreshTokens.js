import jwt from "jsonwebtoken";

async function generateAccessAndRefreshTokens(userId) {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Access token valid for 15 minutes
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d", // Refresh token valid for 7 days
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error generating access and refresh tokens" });
  }
}

export default generateAccessAndRefreshTokens;
