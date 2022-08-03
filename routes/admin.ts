import path from "path";

import express, { Request, Response, NextFunction, Router } from "express";

// import rootDir from "../util/path";
import { getAddProduct } from "../controllers/products";

const router: Router = express.Router();

interface Product {
  title: string;
}

const products: Product[] = [];

router.get("/add-product", getAddProduct);

router.post(
  "/add-product",
  (req: Request, res: Response, _next: NextFunction) => {
    console.log("request body", req.body);
    products.push({ title: req?.body?.title });
    res.redirect("/");
  }
);

export default { routes: router, products };
