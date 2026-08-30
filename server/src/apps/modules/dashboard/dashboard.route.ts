import { Router } from "express";
import { protect, restrictTo } from "../../middleware/auth.middleware";
import {
  getOverview,
  getAnalytics,
  getRecentUsers,
  getActivity,
} from "./dashboard.controller";

const router = Router();

// Secure all dashboard endpoints for staff (ADMIN and MODERATOR) only
router.use(protect);
router.use(restrictTo("ADMIN", "MODERATOR"));

router.get("/overview", getOverview);
router.get("/analytics", getAnalytics);
router.get("/recent-users", getRecentUsers);
router.get("/activity", getActivity);

export default router;
