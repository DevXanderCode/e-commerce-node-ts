"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(routes_1.adminRoutes);
app.use(routes_1.shopRoutes);
app.use((req, res, next) => {
    res.status(404).send("<h1>Page Not Found</h1>");
});
app.listen("3000", () => {
    console.log("Listening on port 3000");
});
