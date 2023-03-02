import { Router } from "express";
import {
  getLogin,
  getNewPassword,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postNewPassword,
  postReset,
  postSignup,
} from "../controllers/auth";

const router: Router = Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.get("/reset", getReset);

router.get("/reset/:token", getNewPassword);

router.post("/login", postLogin);

router.post("/signup", postSignup);

router.post("/reset", postReset);

router.post("/new-password", postNewPassword);

router.post("/logout", postLogout);

export default router;
