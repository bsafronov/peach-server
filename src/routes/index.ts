import { Router } from "express";
import AuthRouter from "./auth";
import UserRouter from "./users";
import PostRouter from "./posts";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/posts", PostRouter);

export default router;
