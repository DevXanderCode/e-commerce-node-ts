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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const sequelize_1 = require("sequelize");
// import {
//   Table,
//   Column,
//   Model,
//   CreatedAt,
//   UpdatedAt,
//   PrimaryKey,
//   DataTypes,
// } from "sequelize-typescript";
// import {
//   CreationOptional,
//   DataTypes,
//   InferAttributes,
//   InferCreationAttributes,
// } from "sequelize/types";
const database_1 = __importDefault(require("../util/database"));
// @Table({
//   timestamps: true,
// })
// class Product extends Model<ProductInterface> {
//   @PrimaryKey
//   @Column
//   id!: number;
//   @Column
//   title!: string;
//   @Column
//   price!: number;
//   @Column
//   imageUrl!: string;
//   @Column
//   description!: string;
//   @CreatedAt
//   @Column
//   createdAt!: Date;
//   @UpdatedAt
//   @Column
//   updatedAt!: Date;
// }
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: sequelize_1.DataTypes.STRING,
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, { sequelize: database_1.default, tableName: "products" });
// const Product = sequelize.define("product", {
//   id: {
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: DataType.STRING,
//   price: {
//     type: DataType.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: DataType.STRING,
//     allowNull: false,
//   },
//   description: { type: DataType.STRING, allowNull: false },
// });
// class Product
//   extends Model<ProductAttributes, ProductAttributes>
//   implements ProductAttributes
// {
//   public id!: number;
//   public title!: string;
//   public price!: number;
//   public imageUrl!: string;
//   public description!: string;
//   // timestamps!
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }
// Product.init(
//   {
//     id: {
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     title: DataType.STRING,
//     price: {
//       type: DataType.DOUBLE,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: DataType.STRING,
//       allowNull: false,
//     },
//     description: { type: DataType.STRING, allowNull: false },
//   },
//   {
//     timestamps: true,
//     sequelize: sequelize,
//     paranoid: true,
//     tableName: "products",
//   }
// );
// export interface ProductAttributes {
//   id: number;
//   title: string;
//   price: number;
//   imageUrl: string;
//   description: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.sync();
}))();
exports.default = Product;
