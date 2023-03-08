"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteFile = (filepath) => {
    fs_1.default.unlink(filepath, (err) => {
        if (err) {
            throw err;
        }
    });
};
exports.deleteFile = deleteFile;
