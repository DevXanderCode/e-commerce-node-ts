"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.postAddProduct = exports.getAddProduct = void 0;
// import { Model } from "sequelize-typescript";
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (_req, res, _next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, _next) => {
    const { title, imageUrl, description, price } = req === null || req === void 0 ? void 0 : req.body;
    // const product = new Product("", title, imageUrl, description, price);
    // product
    //   .save()
    //   .then(() => res.redirect("/"))
    //   .catch((err) => console.error(err));
    req.user
        .createProduct({ title, price, imageUrl, description })
        .then(() => res.redirect("/"))
        .catch((err) => console.error(err));
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
const getEditProduct = (req, res, _next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    req.user
        .getProducts({ where: { id: prodId } })
        // Product.findByPk(prodId)
        .then((products) => {
        // console.log("Edit product", JSON.stringify(product, null, 2));
        const product = products[0];
        if (product) {
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product,
            });
        }
        else {
            res.redirect("/");
        }
    })
        .catch((err) => console.log(err));
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
const postEditProduct = (req, res, _next) => {
    const { productId: prodId, title, imageUrl, description, price } = req === null || req === void 0 ? void 0 : req.body;
    // const updatedProduct = new Product(
    //   prodId,
    //   title,
    //   imageUrl,
    //   description,
    //   price
    // );
    // updatedProduct.save();
    product_1.default.findByPk(prodId)
        .then((product) => {
        if (product) {
            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;
            return product.save();
        }
    })
        .then(() => {
        res.redirect("/admin/products");
    })
        .catch((err) => console.log(err));
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
const postDeleteProduct = (req, res, _next) => {
    var _a;
    const prodId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.productId;
    product_1.default.findByPk(prodId)
        .then((product) => {
        return product.destroy();
    })
        .then(() => {
        console.log("Product deleted");
        res.redirect("/admin/products");
    })
        .catch((err) => {
        console.log("Logging product delete error");
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
 * @param {Request} _req - Request - this is the request object that is passed to the route handler.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction - This is a function that is used to call the next
 * middleware in the stack.
 */
const getAdminProducts = (req, res, _next) => {
    req.user
        .getProducts()
        // Product.findAll()
        .then((result) => {
        res.render("admin/products", {
            prods: result,
            pageTitle: "Admin Products",
            path: "/admin/products",
            // hasProduct: products?.length > 0,
            activeShop: true,
        });
    })
        .catch((err) => console.error(err));
};
exports.getAdminProducts = getAdminProducts;
