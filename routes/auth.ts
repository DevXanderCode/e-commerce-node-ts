import { Router, Request, Response, NextFunction } from "express";
import {
  getLogin,
  getSignup,
  postLogin,
  postLogout,
} from "../controllers/auth";

const router: Router = Router();

router.get("/login", getLogin);

router.post("/login", postLogin);

router.post("/logout", postLogout);

router.get("/signup", getSignup);

export default router;
