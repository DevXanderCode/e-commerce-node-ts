"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.postOrder = exports.getCheckout = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
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
    models_1.Product.findById(prodId)
        .then((result) => {
        console.log("Logging some product ", result);
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
    models_1.Product.fetchAll()
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
/**
 * We're getting the productId from the request body, then we're getting the cart from the user, then
 * we're getting the products from the cart, then we're checking if the product exists in the cart,
 * then we're finding the product by its id, then we're adding the product to the cart, then we're
 * redirecting to the cart page
 * @param {Request} req - Request - this is the request object that is passed to the route handler.
 * @param {Response} res - Response - this is the response object that we can use to send a response
 * back to the client.
 * @param {NextFunction} _next - NextFunction - This is a function that is called when the middleware
 * is done.
 */
const postCart = (req, res, _next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then((cart) => {
        fetchedCart = cart;
        return cart.getProducts();
    })
        .then((products) => {
        let product;
        if (products === null || products === void 0 ? void 0 : products.length) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.CartItem.quantity;
            newQuantity = oldQuantity + 1;
        }
        return models_1.Product.findByPk(prodId);
    })
        .then((product) => {
        if (fetchedCart) {
            return fetchedCart.addProducts(product, {
                through: { quantity: newQuantity },
            });
        }
    })
        .then(() => {
        res.redirect("/cart");
    })
        .catch((err) => console.log("Logging get cart error", err));
};
exports.postCart = postCart;
/**
 * We get the product id from the request body, then we get the cart of the user, then we get the
 * products from the cart, then we get the first product from the products array, then we destroy the
 * cart item, then we redirect to the cart page
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction
 */
const postCartDeleteProduct = (req, res, _next) => {
    var _a;
    const prodId = req.body.productId;
    (_a = req.user) === null || _a === void 0 ? void 0 : _a.getCart().then((cart) => {
        return cart.getProducts({ where: { id: prodId } });
    }).then((products) => {
        const product = products[0];
        return product.CartItem.destroy();
    }).then(() => {
        res.redirect("/cart");
    }).catch((err) => {
        console.log("get cart error", err);
    });
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getCheckout = (_req, res, _next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
};
exports.getCheckout = getCheckout;
const postOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield req.user.getCart();
        const products = yield cart.getProducts();
        let fetchedCart = cart;
        const order = yield req.user.createOrder();
        yield order.addProducts(products.map((product) => {
            product.OrderItem = {
                quantity: product.CartItem.quantity,
            };
            return product;
        }));
        fetchedCart.setProducts(null);
        res.redirect("/orders");
        // console.log("Logging product ", products);
    }
    catch (error) {
        console.log("Logging error", error);
    }
});
exports.postOrder = postOrder;
const getOrders = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield req.user.getOrders({ include: ["Products"] });
        console.log("Orders ==> ", JSON.stringify(orders, null, 2));
        res.render("shop/orders", {
            pageTitle: "My Orders",
            path: "/orders",
            orders: orders,
        });
    }
    catch (error) {
        console.log("Logging get orders error", error);
    }
});
exports.getOrders = getOrders;
