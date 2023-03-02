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
exports.postLogout = exports.postSignup = exports.getSignup = exports.postLogin = exports.getLogin = void 0;
const bcryptjs_1 = require("bcryptjs");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const dotenv = __importStar(require("dotenv"));
const models_1 = require("../models");
dotenv.config();
console.log("Apikeys", process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const mailjet = node_mailjet_1.default.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const sendEmail = (email, name) => mailjet.post("send", { version: "v3.1" }).request({
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
            console.log("saved ===>>", userDoc);
            return sendEmail(email, "user")
                .then((response) => {
                res.redirect("/login");
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
