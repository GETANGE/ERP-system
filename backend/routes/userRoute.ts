import express from "express";

import { createUser, forgotPassword, loginUser, protect, restrictTo } from "../controllers/authController";
import { getAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/" ,protect, restrictTo('admin') ,getAllUsers)
router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/forgotPassword", forgotPassword)

export default router;