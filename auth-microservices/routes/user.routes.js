import { Router } from "express";
import UserController from "../controller/user.controller.js";

const router = Router();

router.get("/getUser/:id", UserController.getUserById);
router.post("/getUsers", UserController.getUsers);

export default router;
