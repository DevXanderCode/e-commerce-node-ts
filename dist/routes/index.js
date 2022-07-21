"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoutes = exports.adminRoutes = void 0;
var admin_1 = require("./admin");
Object.defineProperty(exports, "adminRoutes", { enumerable: true, get: function () { return __importDefault(admin_1).default; } });
var shop_1 = require("./shop");
Object.defineProperty(exports, "shopRoutes", { enumerable: true, get: function () { return __importDefault(shop_1).default; } });
