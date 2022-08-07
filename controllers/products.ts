import { Request, Response, NextFunction, Router } from "express";

import { Product as ProductInterface } from "../types";
import Product from "../models/product";

// export const products: Product[] = [];

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
    activeAddProduct: true,
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

export const getProducts = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // console.log("Admin products", adminData?.products);
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  Product.fetchAll((products: ProductInterface[]) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Da Shop",
      path: "/",
      hasProduct: products?.length > 0,
      activeShop: true,
    });
  });
};
