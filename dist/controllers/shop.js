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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoice = exports.getOrders = exports.postOrder = exports.getCheckout = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const models_1 = require("../models");
// export const products: Product[] = [];
const ITEM_PER_PAGE = 2;
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
const getProducts = (req, res, next) => {
    // console.log("Admin products", adminData?.products);
    // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
    const page = Number(req.query.page || 1);
    let totalItems;
    models_1.Product.find()
        .countDocuments()
        .then((numProduct) => {
        totalItems = numProduct;
        return models_1.Product.find()
            .skip((page - 1) * ITEM_PER_PAGE)
            .limit(ITEM_PER_PAGE);
    })
        .then((result) => {
        res.render("shop/product-list", {
            prods: result,
            pageTitle: "All products",
            path: "/products",
            activeShop: true,
            numProduct: totalItems,
            currentPage: page,
            hasNextPage: ITEM_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
            // isAuthenticated: req.session.isLoggedIn,
        });
    })
        .catch((err) => {
        console.error("Logging err", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.findById(prodId)
        .then((result) => {
        console.log("Logging some product ", result);
        res.render("shop/product-detail", {
            pageTitle: "Product Details",
            product: result,
            path: "/products",
            // isAuthenticated: req.session.isLoggedIn,
        });
    })
        .catch((err) => {
        console.error("Logging err", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
    // .catch((err) => console.error(err));
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    const page = Number(req.query.page || 1);
    let totalItems;
    models_1.Product.find()
        .countDocuments()
        .then((numProduct) => {
        totalItems = numProduct;
        return models_1.Product.find()
            .skip((page - 1) * ITEM_PER_PAGE)
            .limit(ITEM_PER_PAGE);
    })
        .then((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            activeShop: true,
            numProduct: totalItems,
            currentPage: page,
            hasNextPage: ITEM_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
            // isAuthenticated: req.session.isLoggedIn,
            // csrfToken: req.csrfToken(),
        });
    })
        .catch((err) => {
        console.error("Logging err", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
    // .catch((err) => console.log(err));
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
const getCart = (req, res, next) => {
    // if (req.session.user) {
    // return
    req.user
        .populate("cart.items.productId")
        .then((user) => {
        var _a;
        const products = (_a = user === null || user === void 0 ? void 0 : user.cart) === null || _a === void 0 ? void 0 : _a.items;
        // console.log("Logging cart", JSON.stringify(products, null, 2));
        res.render("shop/cart", {
            pageTitle: "My Cart",
            path: "/cart",
            prods: products,
            // isAuthenticated: req.session.isLoggedIn,
        });
    })
        .catch((err) => {
        console.error("Logging err", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
    // .catch((err: Error) => console.log("get cart Errror", err));
    // }
    // return Promise.resolve();
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
const postCart = (req, res, next) => {
    var _a;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.findById(prodId)
        .then((prod) => {
        req.user.addToCart(prod);
        res.redirect("/cart");
    })
        .catch((err) => {
        console.error("Logging err", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
    // .catch((err) => console.log("Logging error", err));
    // let fetchedCart: any;
    // let newQuantity = 1;
    // req.user
    //   .getCart()
    //   .then((cart: any) => {
    //     fetchedCart = cart;
    //     return cart.getProducts();
    //   })
    //   .then((products: ProductInterface[] | undefined) => {
    //     let product;
    //     if (products?.length) {
    //       product = products[0];
    //     }
    //     if (product) {
    //       const oldQuantity = product.CartItem.quantity;
    //       newQuantity = oldQuantity + 1;
    //     }
    //     return Product.findByPk(prodId);
    //   })
    //   .then((product: any) => {
    //     if (fetchedCart) {
    //       return fetchedCart.addProducts(product, {
    //         through: { quantity: newQuantity },
    //       });
    //     }
    //   })
    //   .then(() => {
    //     res.redirect("/cart");
    //   })
    //   .catch((err: Error) => console.log("Logging get cart error", err));
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
const postCartDeleteProduct = (req, res, next) => {
    var _a, _b;
    const prodId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.productId;
    // req.user
    //   ?.getCart()
    //   .then((cart: any) => {
    //     return cart.getProducts({ where: { id: prodId } });
    //   })
    //   .then((products: any) => {
    //     const product = products[0];
    //     return product.CartItem.destroy();
    //   })
    (_b = req.user) === null || _b === void 0 ? void 0 : _b.removeFromCart(prodId).then(() => {
        res.redirect("/cart");
    }).catch((err) => {
        console.log("get cart error", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getCheckout = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .then((user) => {
        // console.log("Logging cart", JSON.stringify(user, null, 2));
        var _a;
        const products = (_a = user === null || user === void 0 ? void 0 : user.cart) === null || _a === void 0 ? void 0 : _a.items;
        let total = 0;
        console.log("Logging cart", JSON.stringify(products, null, 2));
        products.forEach((p) => {
            total += p.quantity * p.productId.price;
        });
        res.render("shop/checkout", {
            pageTitle: "Checkout",
            path: "/checkout",
            products: products,
            totalSum: total,
            // isAuthenticated: req.session.isLoggedIn,
        });
    })
        .catch((err) => {
        console.error("Logging err", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
};
exports.getCheckout = getCheckout;
/**
 * We're populating the cart items with the product details, then we're creating a new order with the
 * user details and the products details, then we're saving the order, then we're clearing the cart,
 * then we're redirecting to the orders page
 * @param {Request} req - Request - this is the incoming request object.
 * @param {Response} res - Response - this is the response object that we can use to send a response
 * back to the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function.
 */
const postOrder = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .then((user) => {
        // console.log("Logging cart", JSON.stringify(user, null, 2));
        var _a, _b;
        const products = (_a = user === null || user === void 0 ? void 0 : user.cart) === null || _a === void 0 ? void 0 : _a.items.map((i) => {
            var _a;
            return ({
                quantity: i === null || i === void 0 ? void 0 : i.quantity,
                product: Object.assign({}, (_a = i === null || i === void 0 ? void 0 : i.productId) === null || _a === void 0 ? void 0 : _a._doc),
            });
        });
        const order = new models_1.Order({
            user: {
                email: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email,
                userId: req === null || req === void 0 ? void 0 : req.user,
            },
            products,
        });
        return order.save();
    })
        .then((_result) => {
        var _a;
        return (_a = req.user) === null || _a === void 0 ? void 0 : _a.clearCart();
    })
        .then(() => {
        res.redirect("/orders");
    })
        .catch((err) => {
        console.log("Post order error ", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
    // try {
    //   await req?.user?.addOrder();
    //   res.redirect("/orders");
    // } catch (error) {
    //   console.log("Logging error", error);
    // }
};
exports.postOrder = postOrder;
/**
 * We're using the find() method to find all the orders that have the same userId as the user that's
 * logged in
 * @param {Request} req - Request - This is the request object that contains the request information.
 * @param {Response} res - Response - This is the response object that we will use to send the response
 * back to the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass the request
 * to the next middleware in line.
 * @returns The orders are being returned.
 */
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const orders = yield models_1.Order.find({ "user.userId": (_b = (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id });
        console.log("Orders ==> ", JSON.stringify(orders, null, 2));
        res.render("shop/orders", {
            pageTitle: "My Orders",
            path: "/orders",
            orders: orders,
            isAuthenticated: req.session.isLoggedIn,
        });
    }
    catch (err) {
        console.log("Logging get orders error", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    }
});
exports.getOrders = getOrders;
/**
 * We are creating a new PDF document, setting the headers, piping the document to the response and the
 * file system, and then writing the invoice data to the document
 * @param {Request} req - Request - This is the incoming request object. It contains all the
 * information about the request.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - This is a function that we can call to pass control to the next
 * middleware function in the stack.
 */
const getInvoice = (req, res, next) => {
    var _a;
    const orderId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.orderId;
    models_1.Order.findById(orderId)
        .then((order) => {
        var _a, _b, _c, _d;
        if (!order) {
            return next(new Error("No Order Found"));
        }
        if (((_b = (_a = order === null || order === void 0 ? void 0 : order.user) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.toString()) !== ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id.toString())) {
            return next(new Error("Unauthorized"));
        }
        const invoiceName = `invoice-${orderId}.pdf`;
        const invoicePath = path_1.default.join("data", "invoices", invoiceName);
        const pdfDoc = new pdfkit_1.default();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'inline; filename="' + invoiceName + '"');
        pdfDoc.pipe(fs_1.default.createWriteStream(invoicePath));
        pdfDoc.pipe(res);
        pdfDoc.fontSize(26).text("Invoice", { underline: true });
        pdfDoc.text("--------------------------------------");
        let totalPrice = 0;
        (_d = order === null || order === void 0 ? void 0 : order.products) === null || _d === void 0 ? void 0 : _d.forEach((prod) => {
            totalPrice += prod.quantity * prod.product.price;
            pdfDoc
                .fontSize(14)
                .text(`${prod.product.title} - ${prod.quantity} x $${prod.product.price}`);
        });
        pdfDoc.text("--------------------------------------");
        pdfDoc.fontSize(20).text(`Total Price: $${totalPrice}`);
        pdfDoc.end();
        // const file = fs.createReadStream(invoicePath);
        // file.pipe(res);
        // fs.readFile(invoicePath, (err, data) => {
        //   if (err) {
        //     return next(err);
        //   }
        //   res.setHeader("Content-type", "application/pdf");
        //   res.setHeader(
        //     "Content-Disposition",
        //     'inline; filename="' + invoiceName + '"'
        //   );
        //   res.send(data);
        // });
    })
        .catch((err) => next(err));
};
exports.getInvoice = getInvoice;
