import { Router, Request, Response, NextFunction } from "express";
import { getLogin, postLogin } from "../controllers/auth";

const router: Router = Router();

router.get("/login", getLogin);

router.post("/login", postLogin);

export default router;
