import { Router } from "express";
import UserController from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.get("/getUser/:id", isAuthenticated, UserController.getUserById);
router.get("/getUsers", isAuthenticated, UserController.getUsers);

export default router;
