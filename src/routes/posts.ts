import { Router } from "express";
import multer from "multer";
import { postController } from "../controllers/post";
import { checkAuth } from "../middlewares/auth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/");
router.post("/", checkAuth, upload.array("picture"), postController.create);

router.post("/comments", checkAuth, postController.createComment);
router.delete("/comments", checkAuth, postController.deleteComment);

router.post("/like", checkAuth, postController.like);

export default router;
