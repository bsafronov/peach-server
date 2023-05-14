import { Router } from "express";
import { authController } from "../controllers/auth";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("picture"), authController.register);
router.post("/login", authController.login);

export default router;
