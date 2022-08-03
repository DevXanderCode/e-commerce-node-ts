"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404Page = void 0;
const get404Page = (_req, res, _next) => {
    // res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
    res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};
exports.get404Page = get404Page;
