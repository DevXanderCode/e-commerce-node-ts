"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewPassword = exports.getNewPassword = exports.postReset = exports.getReset = exports.postLogout = exports.postSignup = exports.getSignup = exports.postLogin = exports.getLogin = void 0;
const bcryptjs_1 = require("bcryptjs");
const dotenv = __importStar(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const mailjet_1 = require("../externals/mailjet");
dotenv.config();
const getLogin = (req, res, next) => {
    //   const isLoggedIn = req.get("Cookie")?.split(";")[0]?.trim().split("=")[1];
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    }
    else {
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
exports.getLogin = getLogin;
const postLogin = (req, res, next) => {
    //   res.setHeader("Set-Cookie", "loggedIn=true");
    const { email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
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
    models_1.User.findOne({ email })
        .then((user) => {
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
        (0, bcryptjs_1.compare)(password, user === null || user === void 0 ? void 0 : user.password)
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
        .catch((err) => console.log("Got this error when trying to find a user", err));
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
exports.postLogin = postLogin;
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
const getSignup = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    }
    else {
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
exports.getSignup = getSignup;
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
const postSignup = (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
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
    (0, bcryptjs_1.hash)(password, 12)
        .then((hashedPassword) => {
        const user = new models_1.User({
            email,
            password: hashedPassword,
            cart: { items: [] },
        });
        return user.save();
    })
        .then((result) => {
        res.redirect("/login");
        return (0, mailjet_1.sendEmail)(email, "user")
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
exports.postSignup = postSignup;
/**
 * It destroys the session and redirects the user to the home page
 * @param {Request} req - Request - This is the request object that contains the information about the
 * request that was made to the server.
 * @param {Response} res - Response - This is the response object that we will use to send a response
 * to the client.
 * @param {NextFunction} next - NextFunction - This is a function that will be called if the current
 * middleware function does not end the request-response cycle.
 */
const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log("Post logout error", err);
        res.redirect("/");
    });
};
exports.postLogout = postLogout;
/**
 * It renders the reset password page and passes in the error message if there is one
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function in the stack.
 */
const getReset = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render("auth/reset", {
        pageTitle: "Reset Password",
        path: "/reset",
        errorMessage: message,
    });
};
exports.getReset = getReset;
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
const postReset = (req, res, next) => {
    const { email } = req.body;
    crypto_1.default.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log("Token generation error", err);
            return res.redirect("/reset");
        }
        let token = buffer.toString("hex");
        models_1.User.findOne({ email: email })
            .then((user) => {
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
            (0, mailjet_1.sendEmail)(email, "User", "Password Reset", `<p>You requested a Password reset</p>
          <p>Click this <a href='http://localhost:3000/reset/${token}'>Link</a> to set a  new password</p>`);
        })
            .catch((err) => {
            console.log("error", err);
        });
    });
};
exports.postReset = postReset;
/**
 * It renders the new-password view and passes the userId and passwordToken to the view
 * @param {Request} req - Request - this is the request object that contains all the information about
 * the request that was made to the server.
 * @param {Response} res - Response - this is the response object that we can use to send a response to
 * the client.
 * @param {NextFunction} next - NextFunction - This is a function that we can call to pass control to
 * the next middleware function in the stack.
 */
const getNewPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    let message = req.flash("error");
    try {
        const user = yield models_1.User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render("auth/new-password", {
            pageTitle: "Set New Password",
            path: "/new-password",
            errorMessage: message,
            userId: user === null || user === void 0 ? void 0 : user._id.toString(),
            passwordToken: token,
        });
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.getNewPassword = getNewPassword;
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
const postNewPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password: newPassword, userId, passwordToken } = req.body;
    try {
        const user = yield models_1.User.findOne({
            resetToken: passwordToken,
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId,
        });
        if (user) {
            const hashedPassword = yield (0, bcryptjs_1.hash)(newPassword, 12);
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            yield user.save();
            yield (0, mailjet_1.sendEmail)(user.email, "User", "Reset Password Successful", `<p>Hello User, your password has been reset successfully</p>
      <p>If this action wasn't performed by you, send us an email</p>
      <p>May the Force be with you</p>`);
            console.log("Password reset successful");
        }
        res.redirect("/login");
    }
    catch (error) {
        console.log("Logging error ==>", error);
    }
});
exports.postNewPassword = postNewPassword;
