"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get500Page = exports.get404Page = void 0;
const get404Page = (req, res, _next) => {
    // res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
    res.status(404).render("404", {
        pageTitle: "Page Not Found",
        path: "/404",
        isAuthenticated: req.session.isLoggedIn,
    });
};
exports.get404Page = get404Page;
const get500Page = (req, res, _next) => {
    res.status(500).render("500", {
        pageTitle: "Error!",
        path: "/500",
        isAuthenticated: req.session.isLoggedIn,
    });
};
exports.get500Page = get500Page;
