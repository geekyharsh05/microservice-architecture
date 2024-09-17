import { Router } from "express";
import PostController from "../controller/post.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.get("/post", PostController.index);
router.post("/post", isAuthenticated, PostController.store);

export default router;
