// import { getProducts } from "./shop";
// import { UserRequest } from "./../types";
import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator/check";
import { Product } from "../models";
import { deleteFile } from "../util/file";
// import { Model } from "sequelize-typescript";

// import Product from "../models/product";
// import { Product as ProductInterface } from "../types";

export const getAddProduct = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // isAuthenticated: req.session.isLoggedIn,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

export const postAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, price } = req?.body;
  const image = req?.file;
  const errors = validationResult(req);

  console.log("Logging Image url");

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      product: {
        title,
        price,
        description,
      },
      hasError: true,
      errorMessage: "Attached File is not an Image",
      validationErrors: [],
    });
  }

  const imageUrl = image.path;

  if (!errors.isEmpty()) {
    console.log("Logging the add product validation errors", errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      product: {
        title,
        price,
        description,
      },
      hasError: true,
      errorMessage: errors.array()[0]?.msg,
      validationErrors: errors.array(),
      // isAuthenticated: req.session.isLoggedIn,
    });
  }
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req?.user,
  });
  product
    .save()
    .then(() => {
      return res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error(err);
      // res.redirect("/500");
      const error: Error & { httpStatusCode?: number } = new Error(err);
      error["httpStatusCode"] = 500;

      return next(error);
    });
  // req.user
  //   .createProduct({ title, price, imageUrl, description })
  //   .then(() => res.redirect("/"))
  //   .catch((err: Error) => console.error(err));
  // Product.create({ title, price, imageUrl, description })
  //   .then(() => res.redirect("/"))
  //   .catch((err) => console.error(err));
};

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
export const getEditProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // req.user
  //   .getProducts({ where: { id: prodId } })
  Product.findById(prodId)
    .then((product) => {
      // console.log("Edit product", JSON .stringify(product, null, 2));

      if (product) {
        res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
          product,
          hasError: false,
          errorMessage: null,
          validationErrors: [],
          // isAuthenticated: req.session.isLoggedIn,
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
      const error: Error & { httpStatusCode?: number } = new Error(err);
      error["httpStatusCode"] = 500;

      return next(error);
    });
};

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
export const postEditProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId: prodId, title, description, price } = req?.body;
  const image = req.file;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log("Logging the add product validation errors", errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: {
        title,
        price,
        description,
        _id: prodId,
      },
      hasError: true,
      errorMessage: errors.array()[0]?.msg,
      validationErrors: errors.array(),
      // isAuthenticated: req.session.isLoggedIn,
    });
  }

  Product.findById(prodId)
    .then((product) => {
      if (product?.userId.toString() !== req.user._id.toString()) {
        res.redirect("/");
        return;
      }
      if (product instanceof Product) {
        product.title = title;
        product.price = price;
        product.description = description;
        if (image) {
          deleteFile(product.imageUrl);
          product.imageUrl = image.path;
        }
        return product.save().then(() => {
          res.redirect("/admin/products");
        });
      }
    })

    .catch((err: any) => {
      console.log(err);
      const error: Error & { httpStatusCode?: number } = new Error(err);
      error["httpStatusCode"] = 500;

      return next(error);
    });
};

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
export const postDeleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prodId = req.body?.productId;
  Product.findById(prodId)
    .then((product): any => {
      if (!product) {
        return next(new Error("Product not found"));
      }
      deleteFile(product?.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      const error: Error & { httpStatusCode?: number } = new Error(err);
      error["httpStatusCode"] = 500;

      return next(error);
    });
  // console.log('delete', prodId)
  // Product.deleteById(prodId, () => {
  //   res.redirect("/admin/products");
  // });
};

/**
 * We're using the fetchAll() method from the Product model to get all the products from the database,
 * then we're rendering the admin/products.ejs view with the products we got from the database
 * @param {Request} req - Request - this is the request object that is passed to the route handler.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} _next - NextFunction - This is a function that is used to call the next
 * middleware in the stack.
 */
export const getAdminProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req.user
  //   .getProducts()
  Product.find({ userId: req.user._id })
    .then((result) => {
      res.render("admin/products", {
        prods: result,
        pageTitle: "Admin Products",
        path: "/admin/products",
        // hasProduct: products?.length > 0,
        activeShop: true,
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.error("get Admin product error", err);
      const error: Error & { httpStatusCode?: number } = new Error(err);
      error["httpStatusCode"] = 500;

      return next(error);
    });
};
