import { Request, Response, NextFunction } from "express";
import { hash } from "bcryptjs";
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
        res.redirect("/login");
      });
    })
    .catch((err) => console.log("post Login error", err));
};

export const getSignup = (req: Request, res: Response, next: NextFunction) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    isAuthenticated: false,
  });
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, confirmPassword } = req.body;
  console.log("Logging email password", email, password);

  User.findOne({ email })
    .then((userDoc: any): any => {
      console;
      if (userDoc) {
        return res.redirect("/signup");
      }
      return hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });

          return user.save();
        })
        .then((result) => {
          console.log("saved ===>>", result);
          res.redirect("/login");
        });
    })

    .catch((err) => {
      console.log(`Logging find user with email(${email}) err ==> ${err}`);
    });
};

export const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    console.log("Post logout error", err);
    res.redirect("/");
  });
};
