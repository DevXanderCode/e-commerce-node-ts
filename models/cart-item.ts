// import {
//   Model,
//   DataTypes,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
// import sequelize from "../util/database";

// class CartItem extends Model<
//   InferAttributes<CartItem>,
//   InferCreationAttributes<CartItem>
// > {
//   declare id: CreationOptional<number>;
//   declare quantity: number;
// }

// CartItem.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   { sequelize, tableName: "cartitem" }
// );

class CartItem {}

export default CartItem;
