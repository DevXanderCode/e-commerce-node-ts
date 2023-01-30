"use strict";
// // import path from "path";
// // import fs from "fs";
Object.defineProperty(exports, "__esModule", { value: true });
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
class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    save() { }
}
exports.default = Product;
