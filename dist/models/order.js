"use strict";
// import {
//   Model,
//   InferCreationAttributes,
//   InferAttributes,
//   CreationOptional,
//   DataTypes,
// } from "sequelize";
// import sequelize from "../util/database";
// import User from "./user";
Object.defineProperty(exports, "__esModule", { value: true });
// class Order extends Model<
//   InferAttributes<Order>,
//   InferCreationAttributes<Order>
// > {
//   declare id: CreationOptional<number>;
// }
// Order.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//   },
//   { sequelize, tableName: "order" }
// );
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    products: [
        {
            product: {
                type: Object,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    user: {
        userId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
});
exports.default = (0, mongoose_1.model)("Order", orderSchema);
