import path from "path";

import express, { Router } from "express";

// import rootDir from "../util/path";
import { getAddProduct, getAdminProducts, postAddProduct, getEditProduct, postEditProduct, postDeleteProduct } from "../controllers/admin";

const router: Router = express.Router();

// /admin/add-product ==> Get
router.get("/add-product", getAddProduct);

// /admin/add-product ==> post
router.post("/add-product", postAddProduct);

// /admin/edit-product/:productId
router.get('/edit-product/:productId', getEditProduct)

//  /admin/products ==> Get
router.get('/products', getAdminProducts);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);

export default router;
