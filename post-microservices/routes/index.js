import { Router } from "express";
import PostRoutes from "./post.routes.js";
const router = Router();

router.use("/post", PostRoutes);

export default router;
