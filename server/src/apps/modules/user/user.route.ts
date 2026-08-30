import { Router } from "express";
import { protect, restrictTo } from "../../middleware/auth.middleware";
import {
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUserProfile,
  userProfile,
  getCurrentUserProfile,
} from "./user.controller";

const router = Router();

router.get("/all-user", protect, restrictTo("ADMIN", "MODERATOR"), getAllUsers);
router.get("/user/:id", protect, restrictTo("ADMIN", "MODERATOR", "USER"), getUserById);
router.delete("/user/:id", protect, restrictTo("ADMIN", "USER"), deleteAccount);
router.get("/profile/me", protect, getCurrentUserProfile);
router.get("/profile/:id", userProfile);
router.patch("/profile/:id", protect, updateUserProfile);

export default router;

