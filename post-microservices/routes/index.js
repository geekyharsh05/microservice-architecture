import { Router } from "express";
import CommentRoutes from "../routes/comment.routes.js"
import PostRoutes from "../routes/post.routes.js"
const router = Router();

router.use("/post", PostRoutes);
router.use("/post/comment",CommentRoutes)

export default router;
