import prisma from "../db/db.config.js";
import comparePasswords from "../utils/comparePassword.js";
import generateHashedPassword from "../utils/generateHashedPassword.js";
import generateAccessAndRefreshTokens from "../utils/generateAccessAndRefreshTokens.js";
import options from "../utils/cookieOptions.js";
import verifyToken from "../utils/verifyToken.js";

class AuthController {
  
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide all the required fields" });
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await generateHashedPassword(password);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      res.status(200).json({ user, message: "Registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide all the required fields" });
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswordCorrect = await comparePasswords(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user.id);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      const loggedInUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      });

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          user: loggedInUser,
          accessToken: `Bearer ${accessToken}`,
          refreshToken,
          message: "Logged in successfully",
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const user = req.user;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async refreshAccessToken(req, res) {
    try {
      const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

      if (!incomingRefreshToken) {
        return res.status(400).json({ message: "No refresh token provided" });
      }

      const decodedToken = verifyToken(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken?.userId,
        },
      });

      if (!user || incomingRefreshToken !== user.refreshToken) {
        return res
          .status(401)
          .json({ message: "Invalid or expired refresh token" });
      }

      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user.id);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          user,
          message: "Refreshed access token successfully",
        });
    } catch (error) {
      res
        .status(401)
        .json({ message: error?.message || "Invalid Refresh Token" });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.user;

      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: "Please provide all the required fields" });
      }

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      const isPasswordCorrect = await comparePasswords(
        oldPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const hashedPassword = await generateHashedPassword(newPassword);

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashedPassword,
        },
      });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error?.message || "Internal server error" });
    }
  }

  static async logout(req, res) {
    try {
      res
        .clearCookie("accessToken", { httpOnly: true, secure: true })
        .json({ message: "Logged out successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: error?.message || "Internal server error" });
    }
  }
}

export default AuthController;
