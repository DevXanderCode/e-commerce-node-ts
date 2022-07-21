"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (_req, res, _next) => {
    res.sendFile(path_1.default.join(__dirname, "../", "../", "views", "shop.html"));
});
exports.default = router;
