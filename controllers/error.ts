import { Request, Response, NextFunction } from "express";

export const get404Page = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const get500Page = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};
