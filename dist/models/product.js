"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const path_2 = __importDefault(require("../util/path"));
// import { Product as ProductInterface } from "../types";
// const products: ProductInterface[] = [];
class Product {
    constructor(t) {
        this.title = t;
    }
    save() {
        // products.push(this);
        const p = path_1.default.join(path_2.default, "..", "data", "products.json");
        // console.log("console log path", p);
        fs_1.default.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent.toString());
            }
            products.push(this);
            fs_1.default.writeFile(p, JSON.stringify(products), (err) => {
                console.log("write product error", err);
            });
        });
    }
    static fetchAll() {
        return [];
        // return products;
    }
}
exports.default = Product;
