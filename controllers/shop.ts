import { Request, Response, NextFunction, Router } from "express";

import { Product as ProductInterface } from "../types";
import { Product, Order } from "../models";

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
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // console.log("Admin products", adminData?.products);
  // res.sendFile(path.join(rootDir, "..", "views", "shop.html"));
  return Product.find()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        pageTitle: "All products",
        path: "/products",
        activeShop: true,
        isAuthenticated: req.isLoggedIn,
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
        product: result,
        path: "/products",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.error(err));
};

export const getIndex = (req: Request, res: Response, _next: NextFunction) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        activeShop: true,
        isAuthenticated: req.isLoggedIn,
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
    .populate("cart.items.productId")
    .then((user: any) => {
      // console.log("Logging cart", JSON.stringify(user, null, 2));

      const products = user?.cart?.items;

      res.render("shop/cart", {
        pageTitle: "My Cart",
        path: "/cart",
        prods: products,
        isAuthenticated: req.isLoggedIn,
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
  Product.findById(prodId)
    .then((prod) => {
      req.user!.addToCart(prod);
      res.redirect("/cart");
    })
    .catch((err) => console.log("Logging error", err));
  // let fetchedCart: any;
  // let newQuantity = 1;

  // req.user
  //   .getCart()
  //   .then((cart: any) => {
  //     fetchedCart = cart;
  //     return cart.getProducts();
  //   })
  //   .then((products: ProductInterface[] | undefined) => {
  //     let product;
  //     if (products?.length) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       const oldQuantity = product.CartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //     }

  //     return Product.findByPk(prodId);
  //   })
  //   .then((product: any) => {
  //     if (fetchedCart) {
  //       return fetchedCart.addProducts(product, {
  //         through: { quantity: newQuantity },
  //       });
  //     }
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err: Error) => console.log("Logging get cart error", err));
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
  const prodId = req?.body?.productId;

  // req.user
  //   ?.getCart()
  //   .then((cart: any) => {
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products: any) => {
  //     const product = products[0];
  //     return product.CartItem.destroy();
  //   })
  req.user
    ?.removeFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err: Error) => {
      console.log("get cart error", err);
    });
};

// export const getCheckout = (
//   _req: Request,
//   res: Response,
//   _next: NextFunction
// ) => {
//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     path: "/checkout",
//   });
// };

export const postOrder = (req: Request, res: Response, _next: NextFunction) => {
  req.user
    .populate("cart.items.productId")
    .then((user: any) => {
      // console.log("Logging cart", JSON.stringify(user, null, 2));

      const products = user?.cart?.items.map((i: any) => ({
        quantity: i?.quantity,
        product: { ...i?.productId?._doc },
      }));

      const order = new Order({
        user: {
          name: req?.user?.name,
          userId: req?.user,
        },
        products,
      });
      return order.save();
    })
    .then((_result: any) => {
      return req.user?.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err: any) => console.log("Post order error ", err));
  // try {
  //   await req?.user?.addOrder();
  //   res.redirect("/orders");
  // } catch (error) {
  //   console.log("Logging error", error);
  // }
};

export const getOrders = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const orders = await Order.find({ "user.userId": req?.user?._id });
    console.log("Orders ==> ", JSON.stringify(orders, null, 2));
    res.render("shop/orders", {
      pageTitle: "My Orders",
      path: "/orders",
      orders: orders,
      isAuthenticated: req.isLoggedIn,
    });
  } catch (error) {
    console.log("Logging get orders error", error);
  }
};
