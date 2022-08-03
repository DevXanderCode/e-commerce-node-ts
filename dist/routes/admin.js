"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import rootDir from "../util/path";
const products_1 = require("../controllers/products");
const router = express_1.default.Router();
router.get("/add-product", products_1.getAddProduct);
router.post("/add-product", products_1.postAddProduct);
exports.default = { routes: router };
