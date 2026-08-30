import { Router } from "express";
import { protect, restrictTo } from "../../middleware/auth.middleware";
import * as interviewsController from "./interviews.controller";

const router = Router();

router.get("/", interviewsController.getInterviews);


router.use(protect);
router.use(restrictTo("ADMIN", "MODERATOR"));

export default router;
