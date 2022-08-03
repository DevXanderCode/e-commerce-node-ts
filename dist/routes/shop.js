"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const router = express_1.default.Router();
router.get("/", (_req, res, _next) => {
    // console.log("Admin products", adminData?.products);
    // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
    res.render("shop", {
        prods: products_1.products,
        pageTitle: "Da Shop",
        path: "/",
        hasProduct: (products_1.products === null || products_1.products === void 0 ? void 0 : products_1.products.length) > 0,
        activeShop: true,
    });
});
exports.default = router;
