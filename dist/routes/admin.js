"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/add-product", (_req, res, _next) => {
    // res.send(
    //   "<form action='/admin/add-product' method='POST'><input type='text' name='title'  /><button type='submit'>Add Product</button></form>"
    // );
    res.sendFile(path_1.default.join(__dirname, "../", "../", "views", "add-product.html"));
});
router.post("/add-product", (req, res, _next) => {
    console.log("request body", req.body);
    res.redirect("/");
});
exports.default = router;
