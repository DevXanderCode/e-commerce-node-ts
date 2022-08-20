"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.getCheckout = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const models_1 = require("../models");
// export const products: Product[] = [];
/**
 * We're using the fetchAll() method from the Product class to get all the products from the database.
 *
 * We're then using the render() method from the response object to render the product-list.ejs
 * template.
 *
 * We're passing in the rows from the database as the prods variable.
 *
 * We're also passing in the pageTitle, path, and activeShop variables.
 *
 * We're then using the catch() method to log any errors.
 * @param {Request} _req - Request,
 * @param {Response} res - Response: This is the response object that we can use to send a response to
 * the request.
 * @param {NextFunction} _next - NextFunction is a function that is called when the middleware is done.
 */
const getProducts = (_req, res, _next) => {
    // console.log("Admin products", adminData?.products);
    // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
    models_1.Product.fetchAll()
        .then(([rows]) => {
        res.render("shop/product-list", {
            prods: rows,
            pageTitle: "All products",
            path: "/products",
            // hasProduct: rows.toString().length > 0,
            activeShop: true,
        });
    })
        .catch((err) => console.error("Logging err", err));
};
exports.getProducts = getProducts;
const getProduct = (req, res, _next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.findById(prodId)
        .then(([rows]) => {
        res.render("shop/product-detail", {
            pageTitle: "Product Details",
            product: rows,
            path: "/products",
        });
    })
        .catch((err) => console.error(err));
};
exports.getProduct = getProduct;
const getIndex = (_req, res, _next) => {
    models_1.Product.fetchAll()
        .then(([rows]) => {
        res.render("shop/index", {
            prods: rows,
            pageTitle: "Shop",
            path: "/",
            // hasProduct: products?.length > 0,
            activeShop: true,
        });
    })
        .catch((err) => console.error(err));
};
exports.getIndex = getIndex;
const getCart = (_req, res, _next) => {
    models_1.Cart.fetchAll(({ products }) => {
        res.render("shop/cart", {
            pageTitle: "My Cart",
            path: "/cart",
            prods: products,
        });
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
    res.redirect("/cart");
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, _next) => {
    const prodId = req.body.productId;
    models_1.Cart.deleteProduct(prodId);
    res.redirect("/cart");
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getCheckout = (_req, res, _next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
};
exports.getCheckout = getCheckout;
const getOrders = (_req, res, _next) => {
    res.render("shop/orders", {
        pageTitle: "My Orders",
        path: "/orders",
    });
};
exports.getOrders = getOrders;
