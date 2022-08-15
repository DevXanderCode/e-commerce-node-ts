import { Request, Response, NextFunction, Router } from "express";

import { Product as ProductInterface } from "../types";
import {Product, Cart} from "../models";


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


export const getProduct = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req?.params?.productId;
  Product.findById(prodId, (product: ProductInterface) => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      product,
      path: '/products'
    });
  });
}

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
  Cart.fetchAll(({products}: {products: ProductInterface[], totalPrice: number}) => {
    console.log('fetched cart', products)
    res.render('shop/cart', {
      pageTitle: 'My Cart',
      path: '/cart',
      prods: products
    })
  })
}

export const postCart = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req?.body?.productId;
  Product.findById(prodId, (product: ProductInterface) => {
    // console.log('Product to add to cart', product);
    Cart.addProduct(prodId, Number(product.price));
  })

  res.redirect('/cart')
 
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
