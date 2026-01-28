import express from "express"
import { register } from "../controllers/authController.mjs";
import { login } from "../controllers/authController.mjs";
import { logout } from "../controllers/authController.mjs";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);




export default router