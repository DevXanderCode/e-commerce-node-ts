import { Router, Request, Response, NextFunction } from "express";
import {
  getLogin,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postReset,
  postSignup,
} from "../controllers/auth";

const router: Router = Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.get("/reset", getReset);

router.post("/login", postLogin);

router.post("/signup", postSignup);

router.post("/reset", postReset);

router.post("/logout", postLogout);

export default router;
