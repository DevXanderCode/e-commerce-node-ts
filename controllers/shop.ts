import { Request, Response, NextFunction, Router } from "express";
// import {} from 'sequelize'

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
  Product.fetchAll()
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
  Product.findById(prodId)
    .then((result) => {
      console.log("Logging some product ", result);
      res.render("shop/product-detail", {
        pageTitle: "Product Details",
        product: result![0],
        path: "/products",
      });
    })
    .catch((err) => console.error(err));
};

export const getIndex = (_req: Request, res: Response, _next: NextFunction) => {
  Product.fetchAll()
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

/**
 * We get the cart from the user, then we get the products from the cart, then we render the cart page
 * with the products
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction is a function that is called when the middleware is done.
 */
export const getCart = (req: Request, res: Response, _next: NextFunction) => {
  req.user
    ?.getCart()
    .then((cart: any) => {
      console.log("Logging cart", cart);
      return cart
        .getProducts()
        .then((products: ProductInterface[]) => {
          res.render("shop/cart", {
            pageTitle: "My Cart",
            path: "/cart",
            prods: products,
          });
        })
        .catch((err: Error) => {
          console.log("get cart product error", err);
        });
    })
    .catch((err: Error) => console.log("get cart Errror", err));
};

/**
 * We're getting the productId from the request body, then we're getting the cart from the user, then
 * we're getting the products from the cart, then we're checking if the product exists in the cart,
 * then we're finding the product by its id, then we're adding the product to the cart, then we're
 * redirecting to the cart page
 * @param {Request} req - Request - this is the request object that is passed to the route handler.
 * @param {Response} res - Response - this is the response object that we can use to send a response
 * back to the client.
 * @param {NextFunction} _next - NextFunction - This is a function that is called when the middleware
 * is done.
 */
export const postCart = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req?.body?.productId;
  let fetchedCart: any;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart: any) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products: ProductInterface[] | undefined) => {
      let product;
      if (products?.length) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.CartItem.quantity;
        newQuantity = oldQuantity + 1;
      }

      return Product.findByPk(prodId);
    })
    .then((product: any) => {
      if (fetchedCart) {
        return fetchedCart.addProducts(product, {
          through: { quantity: newQuantity },
        });
      }
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err: Error) => console.log("Logging get cart error", err));
};

/**
 * We get the product id from the request body, then we get the cart of the user, then we get the
 * products from the cart, then we get the first product from the products array, then we destroy the
 * cart item, then we redirect to the cart page
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction
 */
export const postCartDeleteProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const prodId = req.body.productId;

  req.user
    ?.getCart()
    .then((cart: any) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products: any) => {
      const product = products[0];
      return product.CartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err: Error) => {
      console.log("get cart error", err);
    });
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

export const postOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    let fetchedCart = cart;

    const order = await req.user.createOrder();
    await order.addProducts(
      products.map((product: any) => {
        product.OrderItem = {
          quantity: product.CartItem.quantity,
        };
        return product;
      })
    );
    fetchedCart.setProducts(null);
    res.redirect("/orders");
    // console.log("Logging product ", products);
  } catch (error) {
    console.log("Logging error", error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const orders = await req.user.getOrders({ include: ["Products"] });
    console.log("Orders ==> ", JSON.stringify(orders, null, 2));
    res.render("shop/orders", {
      pageTitle: "My Orders",
      path: "/orders",
      orders: orders,
    });
  } catch (error) {
    console.log("Logging get orders error", error);
  }
};
