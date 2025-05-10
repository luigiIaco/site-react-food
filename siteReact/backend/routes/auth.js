import express from "express";
import {
  register,
  login,
  recoverPassword,
  resetPassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/recoverPassword", recoverPassword);
router.post("/resetPassword", resetPassword);

export default router;
