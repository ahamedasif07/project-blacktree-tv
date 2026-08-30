import authRouter from "@/apps/modules/auth/auth.route";
import { Router } from "express";
import userRouter from "../apps/modules/user/user.route";
import dashboardRouter from "../apps/modules/dashboard/dashboard.route";
import moviesRouter from "../apps/modules/movies/movies.route";
import interviewsRouter from "../apps/modules/interviews/interviews.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/dashboard", dashboardRouter);
router.use("/movies", moviesRouter);
router.use("/interviews", interviewsRouter);

export default router;
