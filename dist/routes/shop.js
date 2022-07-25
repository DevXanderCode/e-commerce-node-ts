"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("./admin"));
const router = express_1.default.Router();
router.get("/", (_req, res, _next) => {
    const products = admin_1.default.products;
    // console.log("Admin products", adminData?.products);
    // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
    res.render("shop", { prods: products, docTitle: "Da Shop" });
});
exports.default = router;
