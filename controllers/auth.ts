import { Request, Response, NextFunction } from "express";

export const getLogin = (req: Request, res: Response, next: NextFunction) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
  });
};
