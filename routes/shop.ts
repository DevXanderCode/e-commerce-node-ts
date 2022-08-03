import path from "path";

import express, { Router, Request, Response, NextFunction } from "express";

// import rootDir from "../util/path";
import adminData from "./admin";
import { products } from "../controllers/products";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  // console.log("Admin products", adminData?.products);
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  res.render("shop", {
    prods: products,
    pageTitle: "Da Shop",
    path: "/",
    hasProduct: products?.length > 0,
    activeShop: true,
  });
});

export default router;
