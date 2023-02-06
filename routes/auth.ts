import { Router, Request, Response, NextFunction } from "express";
import {
  getLogin,
  getSignup,
  postLogin,
  postLogout,
  postSignup,
} from "../controllers/auth";

const router: Router = Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.post("/login", postLogin);

router.post("/signup", postSignup);

router.post("/logout", postLogout);

export default router;
