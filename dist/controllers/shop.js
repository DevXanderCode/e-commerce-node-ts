"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.getCheckout = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const models_1 = require("../models");
// export const products: Product[] = [];
const getProducts = (_req, res, _next) => {
    // console.log("Admin products", adminData?.products);
    // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
    models_1.Product.fetchAll((products) => {
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
const getProduct = (req, res, _next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.findById(prodId, (product) => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            product,
            path: '/products'
        });
    });
};
exports.getProduct = getProduct;
const getIndex = (_req, res, _next) => {
    models_1.Product.fetchAll((products) => {
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
const postCart = (req, res, _next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.findById(prodId, (product) => {
        // console.log('Product to add to cart', product);
        models_1.Cart.addProduct(prodId, Number(product.price));
    });
    res.redirect('/cart');
};
exports.postCart = postCart;
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
