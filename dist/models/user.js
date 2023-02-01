"use strict";
// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Document, ObjectId, WithId } from "mongodb";
// import { getDb } from "../util/database";
// import { Product as ProductType } from "../types";
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
// class User {
//   constructor(
//     public name: string,
//     public email: string,
//     public cart: { items: any[] },
//     public _id: string
//   ) {}
//   save() {
//     const db = getDb();
//     if (typeof db !== "string") {
//       return db
//         .collection("users")
//         .insertOne({ name: this?.name, email: this?.name });
//       // .then((result) => {console.log("created user", result); return result;})
//       // .catch((err) => console.log("Logging add user error", err));
//     }
//     return Promise.resolve();
//   }
//   addToCart(product: any) {
//     const db = getDb();
//     if (typeof db !== "string") {
//       const cartProductIndex = this.cart?.items?.findIndex(
//         (cp) => cp?.productId.toString() === product?._id.toString()
//       );
//       let newQuantity = 1;
//       const updatedCartItems = [...this?.cart?.items];
//       if (cartProductIndex >= 0) {
//         newQuantity = this?.cart?.items[cartProductIndex]?.quantity + 1;
//         updatedCartItems[cartProductIndex].quantity = newQuantity;
//       } else {
//         updatedCartItems.push({
//           productId: new ObjectId(product?._id),
//           quantity: newQuantity,
//         });
//       }
//       const updatedCart = {
//         items: updatedCartItems,
//       };
//       return db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: updatedCart } }
//         )
//         .then((result) => {
//           console.log("Added the cart", result);
//           return result;
//         })
//         .catch((err) => console.log("Logging error", err));
//     }
//     return Promise.resolve();
//   }
//   getCart() {
//     const db = getDb();
//     if (typeof db !== "string") {
//       const productIds = this?.cart?.items.map((item) => item?.productId);
//       return db
//         .collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray()
//         .then((products) => {
//           return products?.map((p) => ({
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i?.productId.toString() === p?._id?.toString();
//             }).quantity,
//           }));
//         })
//         .catch((err) => console.log("Logging get cart products error", err));
//     }
//     return Promise.resolve();
//   }
//   deleteCartItem(prodId: string) {
//     const db = getDb();
//     if (typeof db !== "string") {
//       const updatedCartItems = this.cart.items?.filter(
//         (item) => item?.productId?.toString() !== prodId.toString()
//       );
//       return db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this?._id) },
//           { $set: { cart: { items: updatedCartItems } } }
//         )
//         .then((result) => {
//           console.log("cart Item deleted", result);
//         })
//         .catch((err) => {
//           console.log("Logging delete cart error", err);
//         });
//     }
//     return Promise.resolve();
//   }
//   addOrder() {
//     const db = getDb();
//     if (typeof db !== "string") {
//       return this.getCart()
//         .then((products) => {
//           const order = {
//             items: products,
//             user: {
//               _id: new ObjectId(this._id),
//               name: this?.name,
//             },
//           };
//           return db.collection("orders").insertOne(order);
//         })
//         .then((result) => {
//           this.cart = { items: [] };
//           return db
//             .collection("user")
//             .updateOne(
//               { _id: new ObjectId(this?._id) },
//               { $set: { cart: { items: [] } } }
//             );
//         });
//     }
//     return Promise.resolve();
//   }
//   getOrders() {
//     const db = getDb();
//     if (typeof db !== "string") {
//       return db
//         .collection("orders")
//         .find({ "user._id": new ObjectId(this?._id) })
//         .toArray();
//     }
//     return Promise.resolve();
//   }
//   static findById(userId: string) {
//     const db = getDb();
//     if (typeof db !== "string") {
//       return db.collection("users").findOne({ _id: new ObjectId(userId) });
//       // .then((users) => {
//       //   console.log("Logging user", users);
//       //   return users;
//       // })
//       // .catch((err) => console.log("Logging find users errors", err));
//     }
//     return Promise.resolve();
//   }
// }
const console_1 = __importDefault(require("console"));
const mongoose_1 = require("mongoose");
const product_1 = __importDefault(require("./product"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
});
userSchema.methods.addToCart = function (product) {
    var _a, _b, _c, _d, _e;
    const cartProductIndex = (_b = (_a = this.cart) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.findIndex((cp) => (cp === null || cp === void 0 ? void 0 : cp.productId.toString()) === (product === null || product === void 0 ? void 0 : product._id.toString()));
    let newQuantity = 1;
    const updatedCartItems = [...(_c = this === null || this === void 0 ? void 0 : this.cart) === null || _c === void 0 ? void 0 : _c.items];
    if (cartProductIndex >= 0) {
        newQuantity = ((_e = (_d = this === null || this === void 0 ? void 0 : this.cart) === null || _d === void 0 ? void 0 : _d.items[cartProductIndex]) === null || _e === void 0 ? void 0 : _e.quantity) + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
        updatedCartItems.push({
            productId: product === null || product === void 0 ? void 0 : product._id,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};
userSchema.methods.getCart = function getCart() {
    var _a;
    const productIds = (_a = this === null || this === void 0 ? void 0 : this.cart) === null || _a === void 0 ? void 0 : _a.items.map((item) => item === null || item === void 0 ? void 0 : item.productId);
    return product_1.default.find({ _id: { $in: productIds } })
        .populate("userId")
        .then((products) => {
        // console.log("Logging cart products", JSON.stringify(products, null, 2));
        return products === null || products === void 0 ? void 0 : products.map((p) => {
            console_1.default.log("Logging carts PRoducts", JSON.stringify(p, null, 2));
            return Object.assign(Object.assign({}, p), { quantity: this.cart.items.find((i) => {
                    var _a;
                    return (i === null || i === void 0 ? void 0 : i.productId.toString()) === ((_a = p === null || p === void 0 ? void 0 : p._id) === null || _a === void 0 ? void 0 : _a.toString());
                }).quantity });
        });
    });
    // .catch((err) => console.log("Logging get cart products error", err));
};
exports.default = (0, mongoose_1.model)("User", userSchema);
