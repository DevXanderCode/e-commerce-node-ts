"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
// import { create, engine } from "express-handlebars";
const routes_1 = require("./routes");
const path_2 = __importDefault(require("./util/path"));
const error_1 = require("./controllers/error");
// import ternary from "./util/helpers/ternary";
const database_1 = __importDefault(require("./util/database"));
const models_1 = require("./models");
dotenv.config();
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
app.use((req, res, next) => {
    models_1.User.findByPk(1)
        .then((user) => {
        if (user) {
            req = Object.assign(Object.assign({}, req), { user });
        }
    })
        .catch((err) => console.log("Logging catch user error", err));
});
app.use("/admin", routes_1.adminRoutes);
app.use(routes_1.shopRoutes);
app.use(error_1.get404Page);
models_1.Product.belongsTo(models_1.User, { constraints: true, onDelete: "CASCADE" });
models_1.User.hasMany(models_1.Product);
database_1.default
    .sync()
    .then((result) => {
    // console.log("sequelize result", result);
    return models_1.User.findByPk(1);
})
    .then((user) => {
    if (!user) {
        return models_1.User.create({ name: "Alex", email: "test@test.com" });
    }
    return user;
})
    .then((user) => {
    app.listen("3000", () => {
        console.log("Listening on port 3000");
    });
})
    .catch((err) => {
    console.error(err);
});
