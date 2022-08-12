import { Request, Response, NextFunction, Router } from "express";

import { Product as ProductInterface } from "../types";
import Product from "../models/product";

// export const products: Product[] = [];

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
      pageTitle: "All products",
      path: "/products",
      hasProduct: products?.length > 0,
      activeShop: true,
    });
  });
};

export const getIndex = (_req: Request, res: Response, _next: NextFunction) => {
  Product.fetchAll((products: ProductInterface[]) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProduct: products?.length > 0,
      activeShop: true,
    });
  });
}

export const getCart = (_req: Request, res: Response, _next: NextFunction) => {
  res.render('shop/cart', {
    pageTitle: 'My Cart',
    path: '/cart',
    prods: []
  })
}

export const getCheckout = (_req: Request, res: Response, _next: NextFunction) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  })
}

export const getOrders = (_req: Request, res: Response, _next: NextFunction) => {
  res.render('shop/orders', {
    pageTitle: 'My Orders',
    path: '/orders',

  })
}