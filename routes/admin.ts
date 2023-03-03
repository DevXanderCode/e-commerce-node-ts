import express, { Router } from "express";
import { body } from "express-validator/check";

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
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isNumeric(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postAddProduct
);

// /admin/edit-product/:productId
router.get("/edit-product/:productId", isAuth, getEditProduct);

//  /admin/products ==> Get
router.get("/products", isAuth, getAdminProducts);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isNumeric(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postEditProduct
);

router.post("/delete-product", isAuth, postDeleteProduct);

export default router;
