"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogin = void 0;
const getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
    });
};
exports.getLogin = getLogin;
