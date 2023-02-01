// import {
//   Model,
//   InferCreationAttributes,
//   InferAttributes,
//   CreationOptional,
//   DataTypes,
// } from "sequelize";
// import sequelize from "../util/database";
// import User from "./user";

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

import { Schema, model } from "mongoose";

const orderSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

export default model("Order", orderSchema);
