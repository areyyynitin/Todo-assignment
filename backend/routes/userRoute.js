import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users
router.get("/", authMiddleware, getAllUsers);

export default router;
