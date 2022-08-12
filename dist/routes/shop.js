"use strict";
// import path from "path";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import rootDir from "../util/path";
// import adminData from "./admin";
const shop_1 = require("../controllers/shop");
const router = express_1.default.Router();
router.get('/cart', shop_1.getCart);
router.get('/products', shop_1.getProducts);
router.get('/checkout', shop_1.getCheckout);
router.get('/orders', shop_1.getOrders);
router.get("/", shop_1.getIndex);
exports.default = router;
