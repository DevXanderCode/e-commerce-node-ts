"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAddProduct = exports.getAddProduct = exports.products = void 0;
exports.products = [];
const getAddProduct = (_req, res, _next) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        activeAddProduct: true,
        // layout: false,
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, _next) => {
    var _a;
    console.log("request body", req.body);
    exports.products.push({ title: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title });
    res.redirect("/");
};
exports.postAddProduct = postAddProduct;
