import path from "path";

import express, { Request, Response, NextFunction, Router } from "express";

import rootDir from "../util/path";

const router: Router = express.Router();

interface Product {
  title: string;
}

const products: Product[] = [];

router.get(
  "/add-product",
  (_req: Request, res: Response, _next: NextFunction) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
    res.render("add-product");
  }
);
router.post(
  "/add-product",
  (req: Request, res: Response, _next: NextFunction) => {
    console.log("request body", req.body);
    products.push({ title: req?.body?.title });
    res.redirect("/");
  }
);

export default { routes: router, products };
