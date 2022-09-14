import { Response, Request, NextFunction, RequestHandler } from "express";
// import { Model } from "sequelize-typescript";

import Product from "../models/product";
import { Product as ProductInterface } from "../types";

export const getAddProduct = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const postAddProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { title, imageUrl, description, price } = req?.body;
  // const product = new Product("", title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => res.redirect("/"))
  //   .catch((err) => console.error(err));
  Product.create({ title, price, imageUrl, description })
    .then(() => res.redirect("/"))
    .catch((err) => console.error(err));
};

export const getEditProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      // console.log("Edit product", JSON.stringify(product, null, 2));
      if (product) {
        res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
          product,
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => console.log(err));
};

export const postEditProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { productId: prodId, title, imageUrl, description, price } = req?.body;
  // const updatedProduct = new Product(
  //   prodId,
  //   title,
  //   imageUrl,
  //   description,
  //   price
  // );
  // updatedProduct.save();

  Product.findByPk()
    .then((product) => {
      if (product) {
        product.title = title;
      }
    })
    .catch((err) => console.log(err));
  res.redirect("/admin/products");
};

export const postDeleteProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const prodId = req.body?.productId;
  // console.log('delete', prodId)
  // Product.deleteById(prodId, () => {
  //   res.redirect("/admin/products");
  // });
};

/**
 * We're using the fetchAll() method from the Product model to get all the products from the database,
 * then we're rendering the admin/products.ejs view with the products we got from the database
 * @param {Request} _req - Request - this is the request object that is passed to the route handler.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction - This is a function that is used to call the next
 * middleware in the stack.
 */
export const getAdminProducts = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  Product.findAll()
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
