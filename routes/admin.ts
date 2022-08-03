import path from "path";

import express, { Request, Response, NextFunction, Router } from "express";

// import rootDir from "../util/path";
import { getAddProduct, postAddProduct } from "../controllers/products";

const router: Router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

export default router;
