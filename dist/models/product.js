"use strict";
// import path from "path";
// import fs from "fs";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../util/database"));
// const products: ProductInterface[] = [];
// const p = path.join(rootDir, "..", "data", "products.json");
// const getProductsFromFile = (cb: Function) => {
//   fs.readFile(p, (err, fileContent) => {
//     // console.log("read File", fileContent, fileContent.length);
//     if (err) {
//       cb([]);
//     } else if (fileContent?.length > 0) {
//       cb(JSON.parse(fileContent?.toString()));
//     } else {
//       cb([]);
//     }
//   });
// };
class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        return database_1.default.execute("INSERT INTO product (title, price, imageUrl, description) VALUES (?, ?, ?, ?)", [this.title, this.price, this.imageUrl, this.description]);
    }
    static deleteById(id) { }
    static findById(id) { }
    static fetchAll() {
        return database_1.default.execute("SELECT * FROM products");
    }
}
exports.default = Product;
