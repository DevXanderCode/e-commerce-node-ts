import path from "path";

import express, { Router } from "express";

// import rootDir from "../util/path";
import {
  getAddProduct,
  getAdminProducts,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} from "../controllers/admin";
import { isAuth } from "../middleware";

const router: Router = express.Router();

// /admin/add-product ==> Get
router.get("/add-product", isAuth, getAddProduct);

// /admin/add-product ==> post
router.post("/add-product", isAuth, postAddProduct);

// /admin/edit-product/:productId
router.get("/edit-product/:productId", isAuth, getEditProduct);

//  /admin/products ==> Get
router.get("/products", isAuth, getAdminProducts);

router.post("/edit-product", isAuth, postEditProduct);

router.post("/delete-product", isAuth, postDeleteProduct);

export default router;
