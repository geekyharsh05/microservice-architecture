import { Router } from "express";
import AuthRoutes from "../routes/auth.routes.js";
import UserRoutes from "../routes/user.routes.js";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;
