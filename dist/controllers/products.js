"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddProduct = void 0;
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
