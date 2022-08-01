"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_handlebars_1 = require("express-handlebars");
const routes_1 = require("./routes");
const path_2 = __importDefault(require("./util/path"));
const ternary_1 = __importDefault(require("./util/helpers/ternary"));
const app = (0, express_1.default)();
app.engine("hbs", (0, express_handlebars_1.engine)({ extname: ".hbs", helpers: { ternary: ternary_1.default } }));
// app.set("view engine", "pug");
app.set("view engine", "hbs");
app.set("views", path_1.default.join(path_2.default, "..", "views"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/css", express_1.default.static(path_1.default.join(__dirname, "..", "public", "css")));
app.use("/admin", routes_1.adminRoutes.routes);
app.use(routes_1.shopRoutes);
app.use((_req, res, _next) => {
    // res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
    res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});
app.listen("3000", () => {
    console.log("Listening on port 3000");
});
