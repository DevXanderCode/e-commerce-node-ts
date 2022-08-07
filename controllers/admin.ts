import { Response, Request, NextFunction } from "express";

import Product from "../models/product";

export const getAddProduct = (
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      // activeAddProduct: true, // was needed for the handlebars
      // layout: false,
    });
  };


  export const postAddProduct = (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    // console.log("request body", req.body);
    //   products.push({ title: req?.body?.title });
    const product = new Product(req?.body?.title);
    product.save();
    res.redirect("/");
  };


export const getAdminProducts = (_req: Request, res: Response, _next: NextFunction) => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  }