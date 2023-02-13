// import path from "path";

import express, { Router } from "express";

// import rootDir from "../util/path";
// import adminData from "./admin";
import {
  getCart,
  // getCheckout,
  getIndex,
  getProducts,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteProduct,
  postOrder,
} from "../controllers/shop";
import { isAuth } from "../middleware";

const router: Router = express.Router();

router.get("/cart", isAuth, getCart);

router.post("/cart", isAuth, postCart);

router.post("/cart-delete-item", isAuth, postCartDeleteProduct);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

// router.get("/checkout", getCheckout);

router.get("/orders", isAuth, getOrders);

router.post("/create-order", isAuth, postOrder);

router.get("/", getIndex);

export default router;
