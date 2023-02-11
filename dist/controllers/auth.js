"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postSignup = exports.getSignup = exports.postLogin = exports.getLogin = void 0;
const bcryptjs_1 = require("bcryptjs");
const models_1 = require("../models");
const getLogin = (req, res, next) => {
    var _a;
    //   const isLoggedIn = req.get("Cookie")?.split(";")[0]?.trim().split("=")[1];
    const isLoggedIn = (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.isLoggedIn;
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated: isLoggedIn,
    });
};
exports.getLogin = getLogin;
const postLogin = (req, res, next) => {
    //   res.setHeader("Set-Cookie", "loggedIn=true");
    models_1.User.findById("63da8a48e804c4c4200bf875")
        .then((user) => {
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
exports.postLogin = postLogin;
const getSignup = (req, res, next) => {
    res.render("auth/signup", {
        pageTitle: "Signup",
        path: "/signup",
        isAuthenticated: false,
    });
};
exports.getSignup = getSignup;
const postSignup = (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    console.log("Logging email password", email, password);
    models_1.User.findOne({ email })
        .then((userDoc) => {
        console;
        if (userDoc) {
            return res.redirect("/signup");
        }
        return (0, bcryptjs_1.hash)(password, 12);
    })
        .then((hashedPassword) => {
        const user = new models_1.User({
            email,
            password: hashedPassword,
            cart: { items: [] },
        });
        return user.save();
    })
        .then((result) => {
        console.log("saved ===>>", result);
        res.redirect("/");
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
