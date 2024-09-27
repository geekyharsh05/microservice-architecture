import { Router } from "express"
import CommentController from "../controllers/comment.controller.js"
import isAuthenticated from "../../post-microservices/middleware/isAuthenticated.js"

const router = Router()

router.get("/comment",CommentController.index)
router.post("/get-comments",isAuthenticated,CommentController.store)

export default router;