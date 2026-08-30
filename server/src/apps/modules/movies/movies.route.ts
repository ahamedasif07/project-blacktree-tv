import { Router } from "express";
import { protect, restrictTo } from "../../middleware/auth.middleware";
import * as moviesController from "./movies.controller";

const router = Router();

// --- PUBLIC ROUTES ---
// Available to guests and general visitors of the website
router.get("/", moviesController.getMovies);

// --- PROTECTED ROUTES ---
// Admin and Moderator only endpoints (e.g. creating, updating, deleting movies)
router.use(protect);
router.use(restrictTo("ADMIN", "MODERATOR"));

export default router;
