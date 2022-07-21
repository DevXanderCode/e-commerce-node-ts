import express, { Router, Request, Response, NextFunction } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>Hello from Express js</h1>");
});

export default router;
