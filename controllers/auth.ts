import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export const getLogin = (req: Request, res: Response, next: NextFunction) => {
  //   const isLoggedIn = req.get("Cookie")?.split(";")[0]?.trim().split("=")[1];
  const isLoggedIn = req?.session?.isLoggedIn;

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  //   res.setHeader("Set-Cookie", "loggedIn=true");

  User.findById("63da8a48e804c4c4200bf875")
    .then((user: any) => {
      req.session.user = user;

      req.session.isLoggedIn = true;
      req.session.save((err) => {
        if (err) {
          console.log("Session save error", err);
        }
        res.redirect("/");
      });
    })
    .catch((err) => console.log("post Login error", err));
};

export const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    console.log("Post logout error", err);
    res.redirect("/");
  });
};

export const getSignup = (req: Request, res: Response, next: NextFunction) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    isAuthenticated: req.session.isLoggedIn,
  });
};
