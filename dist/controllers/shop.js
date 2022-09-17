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
    models_1.Product.findAll()
        .then((result) => {
        res.render("shop/product-list", {
            prods: result,
            pageTitle: "All products",
            path: "/products",
            activeShop: true,
        });
    })
        .catch((err) => console.error("Logging err", err));
};
exports.getProducts = getProducts;
const getProduct = (req, res, _next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.findByPk(prodId)
        .then((result) => {
        res.render("shop/product-detail", {
            pageTitle: "Product Details",
            product: result,
            path: "/products",
        });
    })
        .catch((err) => console.error(err));
};
exports.getProduct = getProduct;
const getIndex = (_req, res, _next) => {
    models_1.Product.findAll()
        .then((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            activeShop: true,
        });
    })
        .catch((err) => console.log(err));
    // Product.fetchAll()
    //   .then(([rows]) => {
    //     res.render("shop/index", {
    //       prods: rows,
    //       pageTitle: "Shop",
    //       path: "/",
    //       // hasProduct: products?.length > 0,
    //       activeShop: true,
    //     });
    //   })
    //   .catch((err) => console.error(err));
};
exports.getIndex = getIndex;
/**
 * We get the cart from the user, then we get the products from the cart, then we render the cart page
 * with the products
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction is a function that is called when the middleware is done.
 */
const getCart = (req, res, _next) => {
    var _a;
    (_a = req.user) === null || _a === void 0 ? void 0 : _a.getCart().then((cart) => {
        console.log("Logging cart", cart);
        return cart
            .getProducts()
            .then((products) => {
            res.render("shop/cart", {
                pageTitle: "My Cart",
                path: "/cart",
                prods: products,
            });
        })
            .catch((err) => {
            console.log("get cart product error", err);
        });
    }).catch((err) => console.log("get cart Errror", err));
};
exports.getCart = getCart;
const postCart = (req, res, _next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.findByPk(prodId).then((product) => {
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
