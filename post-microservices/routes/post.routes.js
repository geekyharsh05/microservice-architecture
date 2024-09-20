import { Router } from "express";
import PostController from "../controller/post.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.get("/index", PostController.index);
router.post("/store", isAuthenticated, PostController.store);

export default router;
