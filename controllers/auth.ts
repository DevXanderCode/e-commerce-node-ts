import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import * as dotenv from "dotenv";
import crypto from "crypto";
import { validationResult } from "express-validator/check";
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
    validationErrors: [],
    oldInput: {
      email: "",
      password: "",
    },
  });
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  //   res.setHeader("Set-Cookie", "loggedIn=true");
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Logging errors ", errors.array());
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      path: "/login",
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldInput: {
        email,
        password,
      },
    });
  }

  User.findOne({ email })
    .then((user: any) => {
      if (!user) {
        // req.flash("error", "Invalid email or password.");
        // return res.redirect("/login");
        return res.status(422).render("auth/login", {
          pageTitle: "Login",
          path: "/login",
          errorMessage: "Invalid Email or Password",
          validationErrors: [],
          oldInput: {
            email,
            password,
          },
        });
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
          return res.status(422).render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            errorMessage: "Invalid Email or Password",
            validationErrors: [],
            oldInput: {
              email,
              password,
            },
          });
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

/**
 * It renders the signup page and passes in the error message, if there is one, and the old input
 * values, if there are any
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function in the stack.
 */
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
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

/**
 * We're using the `validationResult` function from the `express-validator` package to validate the
 * user's input. If the validation fails, we're rendering the signup page again and passing the errors
 * to the view. If the validation succeeds, we're hashing the user's password and saving the user to
 * the database
 * @param {Request} req - Request - This is the incoming request object. It contains all the
 * information about the request.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns The user is being returned.
 */
export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  // console.log("Logging email password", email, password);
  if (!errors.isEmpty()) {
    console.log("Validator errors", errors.array());
    return res.status(422).render("auth/signup", {
      pageTitle: "Signup",
      path: "/signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email,
        password,
        confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  // User.findOne({ email })
  //   .then((userDoc: any): any => {
  //     if (userDoc) {
  //       req.flash(
  //         "error",
  //         "E-Mail exist already, please pick a different one."
  //       );
  //       return res.redirect("/signup");
  //     }
  hash(password, 12)
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
        .catch((err) => console.log("Logging mailjet error", err.statusCode));
    });
  // })

  // .catch((err) => {
  //   console.log(`Logging find user with email(${email}) err ==> ${err}`);
  // });
};

/**
 * It destroys the session and redirects the user to the home page
 * @param {Request} req - Request - This is the request object that contains the information about the
 * request that was made to the server.
 * @param {Response} res - Response - This is the response object that we will use to send a response
 * to the client.
 * @param {NextFunction} next - NextFunction - This is a function that will be called if the current
 * middleware function does not end the request-response cycle.
 */
export const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    console.log("Post logout error", err);
    res.redirect("/");
  });
};

/**
 * It renders the reset password page and passes in the error message if there is one
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function in the stack.
 */
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

/**
 * We are generating a random token, checking if the user exists, if the user exists, we are saving the
 * token and the expiration date in the database, and then we are sending an email to the user with a
 * link to reset the password
 * @param {Request} req - Request - This is the request object that contains all the information about
 * the request.
 * @param {Response} res - Response - This is the response object that we will use to send a response
 * back to the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function.
 */
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

/**
 * It renders the new-password view and passes the userId and passwordToken to the view
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function in the stack.
 */
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
      passwordToken: token,
    });
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * It checks if the user exists, if the user exists, it updates the user's password and sends an email
 * to the user
 * @param {Request} req - Request - This is the request object that contains the data sent from the
 * client.
 * @param {Response} res - Response - This is the response object that we will use to send a response
 * to the client.
 * @param {NextFunction} next - NextFunction - This is a function that is called when the middleware is
 * done.
 */
export const postNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password: newPassword, userId, passwordToken } = req.body;

  try {
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId,
    });

    if (user) {
      const hashedPassword = await hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      await user.save();

      await sendEmail(
        user.email,
        "User",
        "Reset Password Successful",
        `<p>Hello User, your password has been reset successfully</p>
      <p>If this action wasn't performed by you, send us an email</p>
      <p>May the Force be with you</p>`
      );

      console.log("Password reset successful");
    }
    res.redirect("/login");
  } catch (error) {
    console.log("Logging error ==>", error);
  }
};
