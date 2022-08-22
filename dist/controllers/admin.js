"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.postAddProduct = exports.getAddProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (_req, res, _next) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        // activeAddProduct: true, // was needed for the handlebars
        // layout: false,
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
    product_1.default.create({ title, price, imageUrl, description })
        .then(() => res.redirect("/"))
        .catch((err) => console.error(err));
};
exports.postAddProduct = postAddProduct;
const getEditProduct = (req, res, _next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    product_1.default.findById(prodId, (product) => {
        if (Object.keys(product).length) {
            // console.log('edit mode', product)
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
    });
};
exports.getEditProduct = getEditProduct;
const postEditProduct = (req, res, _next) => {
    const { productId: prodId, title, imageUrl, description, price } = req === null || req === void 0 ? void 0 : req.body;
    const updatedProduct = new product_1.default(prodId, title, imageUrl, description, price);
    updatedProduct.save();
    res.redirect("/admin/products");
};
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, _next) => {
    var _a;
    const prodId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.productId;
    // console.log('delete', prodId)
    product_1.default.deleteById(prodId, () => {
        res.redirect("/admin/products");
    });
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
const getAdminProducts = (_req, res, _next) => {
    product_1.default.findAll()
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
