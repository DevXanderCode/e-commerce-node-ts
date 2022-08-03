import { Request, Response, NextFunction, Router } from "express";

export const getAddProduct = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // res.send(
  //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
  // );
  // res.sendFile(path.join(rootDir, "..", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    // layout: false,
  });
};
