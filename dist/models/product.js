"use strict";
// // import path from "path";
// // import fs from "fs";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
//     public title: string,j
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
// import { DataType, Model } from "sequelize-typescript";
// import { Optional } from "sequelize";
// import sequelize from "../util/database";
// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
// import sequelize from "../util/database";
// class Product extends Model<
//   InferAttributes<Product>,
//   InferCreationAttributes<Product>
// > {
//   declare id: CreationOptional<number>;
//   declare title: string;
//   declare price: number;
//   declare imageUrl: string;
//   declare description: string;
//   // createdAt can be undefined during creation
//   declare createdAt: CreationOptional<Date>;
//   // updatedAt can be undefined during creation
//   declare updatedAt: CreationOptional<Date>;
// }
// Product.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     title: DataTypes.STRING,
//     price: {
//       type: DataTypes.DOUBLE,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: { type: DataTypes.STRING, allowNull: false },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   { sequelize, tableName: "products" }
// );
// (async () => {
//   await sequelize.sync();
// })();
const mongodb_1 = require("mongodb");
const database_1 = require("../util/database");
class Product {
    constructor(title, price, description, imageUrl, _id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = _id;
        this._id = new mongodb_1.ObjectId(_id);
    }
    save() {
        const db = (0, database_1.getDb)();
        let dbOp;
        if (typeof db !== "string") {
            if (this._id) {
                // Update Product
                dbOp = db.collection("products").updateOne({ _id: this._id }, {
                    $set: this,
                });
            }
            else {
                dbOp = db.collection("products").insertOne({
                    title: this.title,
                    price: this.price,
                    description: this.description,
                    imageUrl: this.imageUrl,
                });
            }
            if (dbOp) {
                return dbOp
                    .then((result) => console.log("Logging result", result))
                    .catch((err) => console.log(err));
            }
            return Promise.resolve();
        }
        return Promise.resolve();
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            if (typeof db !== "string") {
                // return db
                //   .collection("products")
                //   .find()
                //   .toArray()
                //   .then((products) => {
                //     // console.log("Logging Products", products);
                //     return products;
                //   })
                //   .catch((err) => console.log("logging error", err));
                try {
                    return yield db.collection("products").find().toArray();
                }
                catch (error) {
                    console.log("logging error", error);
                }
            }
            return Promise.resolve();
        });
    }
    static findById(prodId) {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db
                .collection("products")
                .find({ _id: new mongodb_1.ObjectId(prodId) })
                .next()
                .then((product) => {
                console.log("single product", product);
                return product;
            })
                .catch((err) => console.log("Logging find by id error", err));
        }
        return Promise.resolve();
    }
    static deleteById(prodId) {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db
                .collection("products")
                .deleteOne({ _id: new mongodb_1.ObjectId(prodId) })
                .then((result) => console.log("deleted product", result))
                .catch((err) => console.log("Logging error", err));
        }
        return Promise.resolve();
    }
}
exports.default = Product;
