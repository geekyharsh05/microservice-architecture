import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshAccessToken);
router.get("/current-user", isAuthenticated, AuthController.getCurrentUser);
router.post("/change-password", isAuthenticated, AuthController.changePassword);
router.get("/logout", isAuthenticated, AuthController.logout);

export default router;
