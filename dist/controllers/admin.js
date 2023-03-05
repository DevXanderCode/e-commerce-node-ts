"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.postAddProduct = exports.getAddProduct = void 0;
const check_1 = require("express-validator/check");
const models_1 = require("../models");
// import { Model } from "sequelize-typescript";
// import Product from "../models/product";
// import { Product as ProductInterface } from "../types";
const getAddProduct = (req, res, _next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        // isAuthenticated: req.session.isLoggedIn,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, next) => {
    var _a;
    const { title, description, price } = req === null || req === void 0 ? void 0 : req.body;
    const imageUrl = req === null || req === void 0 ? void 0 : req.file;
    const errors = (0, check_1.validationResult)(req);
    console.log("Logging Image url");
    if (!errors.isEmpty()) {
        console.log("Logging the add product validation errors", errors.array());
        return res.status(422).render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false,
            product: {
                title,
                price,
                imageUrl,
                description,
            },
            hasError: true,
            errorMessage: (_a = errors.array()[0]) === null || _a === void 0 ? void 0 : _a.msg,
            validationErrors: errors.array(),
            // isAuthenticated: req.session.isLoggedIn,
        });
    }
    const product = new models_1.Product({
        title,
        price,
        description,
        imageUrl,
        userId: req === null || req === void 0 ? void 0 : req.user,
    });
    product
        .save()
        .then(() => {
        return res.redirect("/admin/products");
    })
        .catch((err) => {
        console.error(err);
        // res.redirect("/500");
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
    // req.user
    //   .createProduct({ title, price, imageUrl, description })
    //   .then(() => res.redirect("/"))
    //   .catch((err: Error) => console.error(err));
    // Product.create({ title, price, imageUrl, description })
    //   .then(() => res.redirect("/"))
    //   .catch((err) => console.error(err));
};
exports.postAddProduct = postAddProduct;
/**
 * We're checking if the editMode query parameter is present in the URL, if it is, we're fetching the
 * product from the database and rendering the edit-product view
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction
 * @returns The product object
 */
const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    // req.user
    //   .getProducts({ where: { id: prodId } })
    models_1.Product.findById(prodId)
        .then((product) => {
        // console.log("Edit product", JSON .stringify(product, null, 2));
        if (product) {
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product,
                hasError: false,
                errorMessage: null,
                validationErrors: [],
                // isAuthenticated: req.session.isLoggedIn,
            });
        }
        else {
            res.redirect("/");
        }
    })
        .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
};
exports.getEditProduct = getEditProduct;
/**
 * We're using the findByPk() method to find the product with the given id, then we're updating the
 * product's properties with the new values, and finally we're saving the product
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response
 * back to the client.
 * @param {NextFunction} _next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function in the stack.
 */
const postEditProduct = (req, res, next) => {
    var _a;
    const { productId: prodId, title, imageUrl, description, price } = req === null || req === void 0 ? void 0 : req.body;
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // console.log("Logging the add product validation errors", errors.array());
        return res.status(422).render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: true,
            product: {
                title,
                price,
                imageUrl,
                description,
                _id: prodId,
            },
            hasError: true,
            errorMessage: (_a = errors.array()[0]) === null || _a === void 0 ? void 0 : _a.msg,
            validationErrors: errors.array(),
            // isAuthenticated: req.session.isLoggedIn,
        });
    }
    models_1.Product.findById(prodId)
        .then((product) => {
        if ((product === null || product === void 0 ? void 0 : product.userId.toString()) !== req.user._id.toString()) {
            res.redirect("/");
            return;
        }
        if (product instanceof models_1.Product) {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            return product.save().then(() => {
                res.redirect("/admin/products");
            });
        }
    })
        .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
};
exports.postEditProduct = postEditProduct;
/**
 * We're using the productId from the request body to find the product in the database, then we're
 * deleting it
 * @param {Request} req - Request - this is the incoming request object. It contains all the
 * information about the request.
 * @param {Response} res - Response - this is the response object that we can use to send a response
 * back to the client.
 * @param {NextFunction} _next - NextFunction - This is a function that is called when the middleware
 * is done.
 */
const postDeleteProduct = (req, res, next) => {
    var _a;
    const prodId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.productId;
    models_1.Product.deleteOne({ _id: prodId, userId: req.user._id })
        .then(() => {
        console.log("Product deleted");
        res.redirect("/admin/products");
    })
        .catch((err) => {
        console.log(err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
    // console.log('delete', prodId)
    // Product.deleteById(prodId, () => {
    //   res.redirect("/admin/products");
    // });
};
exports.postDeleteProduct = postDeleteProduct;
/**
 * We're using the fetchAll() method from the Product model to get all the products from the database,
 * then we're rendering the admin/products.ejs view with the products we got from the database
 * @param {Request} req - Request - this is the request object that is passed to the route handler.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction - This is a function that is used to call the next
 * middleware in the stack.
 */
const getAdminProducts = (req, res, next) => {
    // req.user
    //   .getProducts()
    models_1.Product.find({ userId: req.user._id })
        .then((result) => {
        res.render("admin/products", {
            prods: result,
            pageTitle: "Admin Products",
            path: "/admin/products",
            // hasProduct: products?.length > 0,
            activeShop: true,
            // isAuthenticated: req.session.isLoggedIn,
        });
    })
        .catch((err) => {
        console.error("get Admin product error", err);
        const error = new Error(err);
        error["httpStatusCode"] = 500;
        return next(error);
    });
};
exports.getAdminProducts = getAdminProducts;
