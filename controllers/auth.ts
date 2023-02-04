import { Request, Response, NextFunction } from "express";

export const getLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLoggedIn = req.get("Cookie")?.split(";")[0]?.trim().split("=")[1];
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
