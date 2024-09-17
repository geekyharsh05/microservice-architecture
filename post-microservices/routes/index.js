import { Router } from "express";

const router = Router();

router.use("/post", PostRoutes);

export default router;
