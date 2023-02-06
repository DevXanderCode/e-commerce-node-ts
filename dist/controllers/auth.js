"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postLogin = exports.getLogin = void 0;
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
            res.redirect("/");
        });
    })
        .catch((err) => console.log("post Login error", err));
};
exports.postLogin = postLogin;
const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log("Post logout error", err);
        res.redirect("/");
    });
};
exports.postLogout = postLogout;
