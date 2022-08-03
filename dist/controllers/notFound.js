"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (_req, res, _next) => {
    // res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
    res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};
