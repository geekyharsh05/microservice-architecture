import { Router } from "express";
import CommentController from "../controller/comment.controller";
import isAuthenticated from "../middleware/isAuthenticated";

const router = Router

router.get("/getComments",CommentController.getAllComments)
router.post("/CreateCommnet",isAuthenticated,CommentController.createComment)

export default router