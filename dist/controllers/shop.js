"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.getCheckout = exports.getCart = exports.getIndex = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
// export const products: Product[] = [];
const getProducts = (_req, res, _next) => {
    // console.log("Admin products", adminData?.products);
    // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
    product_1.default.fetchAll((products) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All products",
            path: "/products",
            hasProduct: (products === null || products === void 0 ? void 0 : products.length) > 0,
            activeShop: true,
        });
    });
};
exports.getProducts = getProducts;
const getIndex = (_req, res, _next) => {
    product_1.default.fetchAll((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProduct: (products === null || products === void 0 ? void 0 : products.length) > 0,
            activeShop: true,
        });
    });
};
exports.getIndex = getIndex;
const getCart = (_req, res, _next) => {
    res.render('shop/cart', {
        pageTitle: 'My Cart',
        path: '/cart',
        prods: []
    });
};
exports.getCart = getCart;
const getCheckout = (_req, res, _next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
};
exports.getCheckout = getCheckout;
const getOrders = (_req, res, _next) => {
    res.render('shop/orders', {
        pageTitle: 'My Orders',
        path: '/orders',
    });
};
exports.getOrders = getOrders;
