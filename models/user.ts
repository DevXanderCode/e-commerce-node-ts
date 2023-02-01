// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";

import { Document, ObjectId, WithId } from "mongodb";
import { getDb } from "../util/database";
import { Product as ProductType } from "../types";

// // import sequelize from "../util/database";

// class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
//   [x: string]: any;
//   declare id: CreationOptional<number>;
//   declare email: string;
//   declare name: string;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   { sequelize, tableName: "users" }
// );

class User {
  constructor(
    public name: string,
    public email: string,
    public cart: { items: any[] },
    public _id: string
  ) {}

  save() {
    const db = getDb();

    if (typeof db !== "string") {
      return db
        .collection("users")
        .insertOne({ name: this?.name, email: this?.name });
      // .then((result) => {console.log("created user", result); return result;})
      // .catch((err) => console.log("Logging add user error", err));
    }
    return Promise.resolve();
  }

  addToCart(product: any) {
    const db = getDb();

    if (typeof db !== "string") {
      const cartProductIndex = this.cart?.items?.findIndex(
        (cp) => cp?.productId.toString() === product?._id.toString()
      );
      let newQuantity = 1;
      const updatedCartItems = [...this?.cart?.items];

      if (cartProductIndex >= 0) {
        newQuantity = this?.cart?.items[cartProductIndex]?.quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      } else {
        updatedCartItems.push({
          productId: new ObjectId(product?._id),
          quantity: newQuantity,
        });
      }
      const updatedCart = {
        items: updatedCartItems,
      };

      return db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart: updatedCart } }
        )
        .then((result) => {
          console.log("Added the cart", result);
          return result;
        })
        .catch((err) => console.log("Logging error", err));
    }
    return Promise.resolve();
  }

  static findById(userId: string) {
    const db = getDb();

    if (typeof db !== "string") {
      return db.collection("users").findOne({ _id: new ObjectId(userId) });
      // .then((users) => {
      //   console.log("Logging user", users);
      //   return users;
      // })
      // .catch((err) => console.log("Logging find users errors", err));
    }
    return Promise.resolve();
  }
}

export default User;
