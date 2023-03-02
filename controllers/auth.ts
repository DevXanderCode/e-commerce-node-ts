import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import * as dotenv from "dotenv";
import crypto from "crypto";
import { User } from "../models";
import { sendEmail } from "../externals/mailjet";

dotenv.config();

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
          res.redirect("/login");

          return sendEmail(email, "user")
            .then((response) => {
              // res.redirect("/login");
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

export const getReset = (req: Request, res: Response, next: NextFunction) => {
  let message: string | string[] | null = req.flash("error");

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    pageTitle: "Reset Password",
    path: "/reset",
    errorMessage: message,
  });
};

export const postReset = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log("Token generation error", err);
      return res.redirect("/reset");
    }

    let token = buffer.toString("hex");

    User.findOne({ email: email })
      .then((user: any) => {
        if (!user) {
          req.flash("error", "No Account with email found!");
          return res.redirect("/reset");
        }

        user.resetToken = token;
        user.resetTokenExpiration = new Date(Date.now() + 3600000);

        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        sendEmail(
          email,
          "User",
          "Password Reset",
          `<p>You requested a Password reset</p>
          <p>Click this <a href='http://localhost:3000/reset/${token}'>Link</a> to set a  new password</p>`
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
};

export const getNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;
  let message: string | string[] | null = req.flash("error");

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    res.render("auth/new-password", {
      pageTitle: "Set New Password",
      path: "/new-password",
      errorMessage: message,
      userId: user?._id.toString(),
    });
  } catch (error) {
    console.log("error", error);
  }
};
