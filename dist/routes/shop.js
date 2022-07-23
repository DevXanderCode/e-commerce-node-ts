"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const path_2 = __importDefault(require("../util/path"));
const admin_1 = __importDefault(require("./admin"));
const router = express_1.default.Router();
router.get("/", (_req, res, _next) => {
    console.log("Admin products", admin_1.default === null || admin_1.default === void 0 ? void 0 : admin_1.default.products);
    res.sendFile(path_1.default.join(path_2.default, "..", "views", "shop.html"));
});
exports.default = router;
