import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import Mailjet from "node-mailjet";
import * as dotenv from "dotenv";
import { User } from "../models";

dotenv.config();

console.log(
  "Apikeys",
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!,
  process.env.MJ_APIKEY_PRIVATE!
);

const sendEmail = (email: string, name: string) =>
  mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "essienemma300dev@gmail.com",
          Name: "Jarvis",
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: "Signup Status",
        TextPart: `Dear ${name}, welcome to Node Ecommerce! Your sign up was successful, May the force be with you!`,
        HTMLPart: `<h3>Dear ${name}, welcome to <a href=\"https://www.mailjet.com/\">Node-Ecommerce</a>!</h3><br />May the force be with you!`,
      },
    ],
  });

export const getLogin = (req: Request, res: Response, next: NextFunction) => {
  //   const isLoggedIn = req.get("Cookie")?.split(";")[0]?.trim().split("=")[1];
  let message: string | string[] | null = req.flash("error");

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  //   res.setHeader("Set-Cookie", "loggedIn=true");
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      compare(password, user?.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              if (err) {
                console.log("Session save error", err);
              }
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => console.log("got this matching password error", err));
    })
    .catch((err) =>
      console.log("Got this error when trying to find a user", err)
    );

  // User.findById("63da8a48e804c4c4200bf875")
  //   .then((user: any) => {
  //     req.session.user = user;

  //     req.session.isLoggedIn = true;
  //     req.session.save((err) => {
  //       if (err) {
  //         console.log("Session save error", err);
  //       }
  //       res.redirect("/login");
  //     });
  //   })
  //   .catch((err) => console.log("post Login error", err));
};

export const getSignup = (req: Request, res: Response, next: NextFunction) => {
  let message: string | string[] | null = req.flash("error");

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    isAuthenticated: false,
    errorMessage: message,
  });
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, confirmPassword } = req.body;
  // console.log("Logging email password", email, password);

  User.findOne({ email })
    .then((userDoc: any): any => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exist already, please pick a different one."
        );
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
          console.log("saved ===>>", userDoc);

          return sendEmail(email, "user")
            .then((response) => {
              res.redirect("/login");
              console.log("email sent", response.response.status);
            })
            .catch((err) =>
              console.log("Logging mailjet error", err.statusCode)
            );
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
