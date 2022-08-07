"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import rootDir from "../util/path";
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
// /admin/add-product ==> Get
router.get("/add-product", admin_1.getAddProduct);
// /admin/add-product ==> post
router.post("/add-product", admin_1.postAddProduct);
//  /admin/products ==> Get
router.get('/products', admin_1.getAdminProducts);
exports.default = router;
