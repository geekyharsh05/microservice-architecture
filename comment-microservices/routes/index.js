import {Router} from 'express';

import CommentRouter from "./comments.routes.js"


const router  = Router()

router.use("/comment",CommentRouter)

export default router;