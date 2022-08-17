"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.getEditProduct = exports.postAddProduct = exports.getAddProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (_req, res, _next) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false
        // activeAddProduct: true, // was needed for the handlebars
        // layout: false,
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, _next) => {
    // console.log("request body", req.body);
    //   products.push({ title: req?.body?.title });
    const { title, imageUrl, description, price } = req === null || req === void 0 ? void 0 : req.body;
    const product = new product_1.default(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};
exports.postAddProduct = postAddProduct;
const getEditProduct = (req, res, _next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    product_1.default.findById(prodId, (product) => {
        if (Object.keys(product).length) {
            console.log('edit mode', product);
            res.render('admin/edit-product', {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product
            });
        }
        else {
            res.redirect('/');
        }
    });
};
exports.getEditProduct = getEditProduct;
const getAdminProducts = (_req, res, _next) => {
    product_1.default.fetchAll((products) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            hasProduct: (products === null || products === void 0 ? void 0 : products.length) > 0,
            activeShop: true,
        });
    });
    // res.render('admin/products', {
    //   pageTitle: 'Admin Products',
    //   path: '/admin/products',
    // });
};
exports.getAdminProducts = getAdminProducts;
