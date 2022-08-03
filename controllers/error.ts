import { Request, Response, NextFunction } from "express";

export const get404Page = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};
