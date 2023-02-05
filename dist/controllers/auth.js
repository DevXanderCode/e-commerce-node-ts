"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getLogin = void 0;
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
    req.session.isLoggedIn = true;
    res.redirect("/");
};
exports.postLogin = postLogin;
