"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
// import { Product } from "../types";
const product_1 = __importDefault(require("../models/product"));
// export const products: Product[] = [];
const getAddProduct = (_req, res, _next) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        activeAddProduct: true,
        // layout: false,
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, _next) => {
    var _a;
    console.log("request body", req.body);
    //   products.push({ title: req?.body?.title });
    const product = new product_1.default((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title);
    product.save();
    res.redirect("/");
};
exports.postAddProduct = postAddProduct;
const getProducts = (_req, res, _next) => {
    // console.log("Admin products", adminData?.products);
    // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
    const products = product_1.default.fetchAll();
    res.render("shop", {
        prods: products,
        pageTitle: "Da Shop",
        path: "/",
        hasProduct: (products === null || products === void 0 ? void 0 : products.length) > 0,
        activeShop: true,
    });
};
exports.getProducts = getProducts;
