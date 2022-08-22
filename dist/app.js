"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { create, engine } from "express-handlebars";
const routes_1 = require("./routes");
const path_2 = __importDefault(require("./util/path"));
const error_1 = require("./controllers/error");
// import ternary from "./util/helpers/ternary";
const database_1 = __importDefault(require("./util/database"));
const app = (0, express_1.default)();
// For handleBars
// app.engine(
//   "hbs",
//   engine({
//     extname: ".hbs",
//     helpers: { ternary },
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//   })
// );
// app.set("view engine", "pug");
// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", path_1.default.join(path_2.default, "..", "views"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
// Test database connection
// db.execute('SELECT * FROM products').then(result => {
//   console.log('Logging data ====> ', result[0]);
//   console.log('Logging meta data ===> ', result[1]);
// }).catch(err => {
//   console.log('Logging execution error', err)
// });
app.use("/admin", routes_1.adminRoutes);
app.use(routes_1.shopRoutes);
app.use(error_1.get404Page);
database_1.default
    .sync()
    .then((result) => {
    console.log("sequelize result", result);
    app.listen("3000", () => {
        console.log("Listening on port 3000");
    });
})
    .catch((err) => {
    console.error(err);
});
