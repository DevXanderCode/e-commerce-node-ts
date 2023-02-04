"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
const getLogin = (req, res, next) => {
    var _a, _b;
    const isLoggedIn = (_b = (_a = req.get("Cookie")) === null || _a === void 0 ? void 0 : _a.split(";")[0]) === null || _b === void 0 ? void 0 : _b.trim().split("=")[1];
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated: isLoggedIn,
    });
};
exports.getLogin = getLogin;
const postLogin = (req, res, next) => {
    res.setHeader("Set-Cookie", "loggedIn=true");
    res.redirect("/");
};
exports.postLogin = postLogin;
