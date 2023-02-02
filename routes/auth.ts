import { Router, Request, Response, NextFunction } from "express";
import { getLogin } from "../controllers/auth";

const router: Router = Router();

router.get("/login", getLogin);

export default router;
