import path from "path";

import express, { Router, Request, Response, NextFunction } from "express";

import rootDir from "../util/path";
import adminData from "./admin";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  console.log("Admin products", adminData?.products);
  res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
});

export default router;
