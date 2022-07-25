import path from "path";

import express, { Router, Request, Response, NextFunction } from "express";

import rootDir from "../util/path";
import adminData from "./admin";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  const products = adminData.products;
  // console.log("Admin products", adminData?.products);
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  res.render("shop", { prods: products, docTitle: "Da Shop" });
});

export default router;
