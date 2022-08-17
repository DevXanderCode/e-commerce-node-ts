import path from "path";

import express, { Router } from "express";

// import rootDir from "../util/path";
import { getAddProduct, getAdminProducts, postAddProduct, getEditProduct } from "../controllers/admin";

const router: Router = express.Router();

// /admin/add-product ==> Get
router.get("/add-product", getAddProduct);

// /admin/add-product ==> post
router.post("/add-product", postAddProduct);

// /admin/edit-product/:productId
router.get('/edit-product/:productId', getEditProduct)

//  /admin/products ==> Get
router.get('/products', getAdminProducts);

export default router;
