"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.postAddProduct = exports.getAddProduct = void 0;
const models_1 = require("../models");
// import { Model } from "sequelize-typescript";
// import Product from "../models/product";
// import { Product as ProductInterface } from "../types";
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
    const product = new models_1.Product({
        title,
        price,
        description,
        imageUrl,
    });
    product
        .save()
        .then(() => res.redirect("/admin/product"))
        .catch((err) => console.error(err));
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
// export const getEditProduct = (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   // req.user
//   //   .getProducts({ where: { id: prodId } })
//   Product.findById(prodId)
//     .then((product) => {
//       // console.log("Edit product", JSON .stringify(product, null, 2));
//       if (product) {
//         res.render("admin/edit-product", {
//           pageTitle: "Edit Product",
//           path: "/admin/edit-product",
//           editing: editMode,
//           product,
//         });
//       } else {
//         res.redirect("/");
//       }
//     })
//     .catch((err: Error) => console.log(err));
// };
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
// export const postEditProduct = (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ) => {
//   const { productId: prodId, title, imageUrl, description, price } = req?.body;
//   const product = new Product(title, price, description, imageUrl, prodId);
//   // const updatedProduct = new Product(
//   //   prodId,
//   //   title,
//   //   imageUrl,
//   //   description,
//   //   price
//   // );
//   // updatedProduct.save();
//   product
//     .save()
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch((err: any) => console.log(err));
// };
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
// export const postDeleteProduct = (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ) => {
//   const prodId = req.body?.productId;
//   Product.deleteById(prodId)
//     .then(() => {
//       console.log("Product deleted");
//       res.redirect("/admin/products");
//     })
//     .catch((err: any) => {
//       console.log("Logging product delete error");
//     });
//   // console.log('delete', prodId)
//   // Product.deleteById(prodId, () => {
//   //   res.redirect("/admin/products");
//   // });
// };
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
    // req.user
    //   .getProducts()
    models_1.Product.fetchAll()
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
