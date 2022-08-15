// import path from "path";

import express, { Router } from "express";

// import rootDir from "../util/path";
// import adminData from "./admin";
import { getCart, getCheckout, getIndex, getProducts, getOrders, getProduct, postCart } from "../controllers/shop";

const router: Router = express.Router();

router.get('/cart', getCart);

router.post('/cart', postCart);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/checkout', getCheckout);

router.get('/orders', getOrders);

router.get("/", getIndex );

export default router;
