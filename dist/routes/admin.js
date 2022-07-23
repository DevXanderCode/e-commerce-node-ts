"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const path_2 = __importDefault(require("../util/path"));
const router = express_1.default.Router();
const products = [];
router.get("/add-product", (_req, res, _next) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    res.sendFile(path_1.default.join(path_2.default, "..", "views", "add-product.html"));
});
router.post("/add-product", (req, res, _next) => {
    var _a;
    console.log("request body", req.body);
    products.push({ title: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title });
    res.redirect("/");
});
exports.default = { routes: router, products };
