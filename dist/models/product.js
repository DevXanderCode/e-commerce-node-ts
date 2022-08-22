"use strict";
// // import path from "path";
// // import fs from "fs";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Cart from "./cart";
// import rootDir from "../util/path";
// import { Product as ProductInterface } from "../types";
// import db from "../util/database";
// // const products: ProductInterface[] = [];
// // const p = path.join(rootDir, "..", "data", "products.json");
// // const getProductsFromFile = (cb: Function) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     // console.log("read File", fileContent, fileContent.length);
// //     if (err) {
// //       cb([]);
// //     } else if (fileContent?.length > 0) {
// //       cb(JSON.parse(fileContent?.toString()));
// //     } else {
// //       cb([]);
// //     }
// //   });
// // };
// class Product {
//   constructor(
//     public id: string,
//     public title: string,
//     public imageUrl: string,
//     public description: string,
//     public price: number
//   ) {}
//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }
//   static deleteById(id: string) {}
//   static findById(id: string) {
//     return db.execute("SELECT * FROM products WHERE id = ?", [id]);
//   }
//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }
//   // old methods
//   // save() {
//   //   // products.push(this);
//   //   // console.log("console log path", p);
//   //   getProductsFromFile((products: ProductInterface[]) => {
//   //   if (this.id){
//   //     const existingProductIndex = products.findIndex(prod => prod?.id === this.id);
//   //     const updatedProduct = [...products];
//   //     updatedProduct[existingProductIndex] = this;
//   //     fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
//   //       console.log("write product error", err);
//   //     });
//   //   }else {
//   //     this.id = Math.random().toString();
//   //       products.push(this);
//   //       fs.writeFile(p, JSON.stringify(products), (err) => {
//   //         console.log("write product error", err);
//   //       });
//   //   }
//   //   });
//   //   // fs.readFile(p, (err, fileContent) => {
//   //   //   let products = [];
//   //   //   if (!err) {
//   //   //     products = JSON.parse(fileContent.toString());
//   //   //   }
//   //   //   products.push(this);
//   //   //   fs.writeFile(p, JSON.stringify(products), (err) => {
//   //   //     console.log("write product error", err);
//   //   //   });
//   //   // });
//   // }
//   // static deleteById (id: string, cb: Function) {
//   //   console.log('delete')
//   //   getProductsFromFile((products: ProductInterface[]) => {
//   //     const updatedProduct = products.filter(prod => prod?.id !== id);
//   //     fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
//   //       console.log("write product error", err);
//   //       if (!err) {
//   //         Cart.deleteProduct(id);
//   //         cb()
//   //       }
//   //     });
//   //   });
//   // }
//   // static fetchAll(cb: Function) {
//   //   getProductsFromFile(cb);
//   // }
//   // static findById(id: string, cb: Function ) {
//   //   getProductsFromFile((products: Product[]) => {
//   //     const product = products.find(p => p?.id === id);
//   //     cb(product)
//   //   })
//   // }
// }
// export default Product;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("../util/database"));
const Product = database_1.default.define("product", {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: sequelize_typescript_1.DataType.STRING,
    price: {
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    },
    description: { type: sequelize_typescript_1.DataType.STRING, allowNull: false },
});
exports.default = Product;
