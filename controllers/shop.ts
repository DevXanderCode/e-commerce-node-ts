import { Request, Response, NextFunction, Router } from "express";

import { Product as ProductInterface } from "../types";
import { Product, Cart } from "../models";

// export const products: Product[] = [];

/**
 * We're using the fetchAll() method from the Product class to get all the products from the database.
 *
 * We're then using the render() method from the response object to render the product-list.ejs
 * template.
 *
 * We're passing in the rows from the database as the prods variable.
 *
 * We're also passing in the pageTitle, path, and activeShop variables.
 *
 * We're then using the catch() method to log any errors.
 * @param {Request} _req - Request,
 * @param {Response} res - Response: This is the response object that we can use to send a response to
 * the request.
 * @param {NextFunction} _next - NextFunction is a function that is called when the middleware is done.
 */
export const getProducts = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // console.log("Admin products", adminData?.products);
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  Product.findAll()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        pageTitle: "All products",
        path: "/products",
        activeShop: true,
      });
    })
    .catch((err) => console.error("Logging err", err));
};

export const getProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const prodId = req?.params?.productId;
  Product.findByPk(prodId)
    .then((result) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Details",
        product: result,
        path: "/products",
      });
    })
    .catch((err) => console.error(err));
};

export const getIndex = (_req: Request, res: Response, _next: NextFunction) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        activeShop: true,
      });
    })
    .catch((err) => console.log(err));
  // Product.fetchAll()
  //   .then(([rows]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //       // hasProduct: products?.length > 0,
  //       activeShop: true,
  //     });
  //   })
  //   .catch((err) => console.error(err));
};

export const getCart = (_req: Request, res: Response, _next: NextFunction) => {
  Cart.fetchAll(
    ({ products }: { products: ProductInterface[]; totalPrice: number }) => {
      res.render("shop/cart", {
        pageTitle: "My Cart",
        path: "/cart",
        prods: products,
      });
    }
  );
};

export const postCart = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req?.body?.productId;
  Product.findById(prodId, (product: ProductInterface) => {
    // console.log('Product to add to cart', product);
    Cart.addProduct(prodId, Number(product.price));
  });

  res.redirect("/cart");
};

export const postCartDeleteProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const prodId = req.body.productId;

  Cart.deleteProduct(prodId);
  res.redirect("/cart");
};

export const getCheckout = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

export const getOrders = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.render("shop/orders", {
    pageTitle: "My Orders",
    path: "/orders",
  });
};
