import express from "express";

import { createUser, forgotPassword, loginUser, protect, resetPassword, restrictTo, updatePassword } from "../controllers/authController";
import { getAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/" , protect, restrictTo('admin'),getAllUsers)
router.post("/register", createUser);
router.post("/login", loginUser);
router.patch("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.patch("/updatePassword", updatePassword);

export default router;