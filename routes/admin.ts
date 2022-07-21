import path from "path";

import express, { Request, Response, NextFunction, Router } from "express";

import rootDir from "../util/path";

const router: Router = express.Router();

router.get(
  "/add-product",
  (_req: Request, res: Response, _next: NextFunction) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
  }
);

router.post(
  "/add-product",
  (req: Request, res: Response, _next: NextFunction) => {
    console.log("request body", req.body);
    res.redirect("/");
  }
);

export default router;
