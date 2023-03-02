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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReset = exports.getReset = exports.postLogout = exports.postSignup = exports.getSignup = exports.postLogin = exports.getLogin = void 0;
const bcryptjs_1 = require("bcryptjs");
const dotenv = __importStar(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
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
    });
};
exports.getLogin = getLogin;
const postLogin = (req, res, next) => {
    //   res.setHeader("Set-Cookie", "loggedIn=true");
    const { email, password } = req.body;
    models_1.User.findOne({ email })
        .then((user) => {
        if (!user) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/login");
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
            req.flash("error", "Invalid email or password.");
            res.redirect("/login");
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
    });
};
exports.getSignup = getSignup;
const postSignup = (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    // console.log("Logging email password", email, password);
    models_1.User.findOne({ email })
        .then((userDoc) => {
        if (userDoc) {
            req.flash("error", "E-Mail exist already, please pick a different one.");
            return res.redirect("/signup");
        }
        return (0, bcryptjs_1.hash)(password, 12)
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
    })
        .catch((err) => {
        console.log(`Logging find user with email(${email}) err ==> ${err}`);
    });
};
exports.postSignup = postSignup;
const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log("Post logout error", err);
        res.redirect("/");
    });
};
exports.postLogout = postLogout;
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
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        })
            .then((result) => {
            res.redirect("/");
            (0, mailjet_1.sendEmail)(email, "User", "Password Reset", `<p>You requested a Password reset</p><p>Click this <a href='http://localhost:3000/reset/${token}'>Link</a> to set a  new password</p>`);
        })
            .catch((err) => {
            console.log("error", err);
        });
    });
};
exports.postReset = postReset;
