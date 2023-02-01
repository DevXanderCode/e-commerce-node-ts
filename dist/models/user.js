"use strict";
// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = require("../util/database");
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
    constructor(name, email, cart, _id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = _id;
    }
    save() {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db
                .collection("users")
                .insertOne({ name: this === null || this === void 0 ? void 0 : this.name, email: this === null || this === void 0 ? void 0 : this.name });
            // .then((result) => {console.log("created user", result); return result;})
            // .catch((err) => console.log("Logging add user error", err));
        }
        return Promise.resolve();
    }
    addToCart(product) {
        var _a, _b, _c, _d, _e;
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            const cartProductIndex = (_b = (_a = this.cart) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.findIndex((cp) => (cp === null || cp === void 0 ? void 0 : cp.productId.toString()) === (product === null || product === void 0 ? void 0 : product._id.toString()));
            let newQuantity = 1;
            const updatedCartItems = [...(_c = this === null || this === void 0 ? void 0 : this.cart) === null || _c === void 0 ? void 0 : _c.items];
            if (cartProductIndex >= 0) {
                newQuantity = ((_e = (_d = this === null || this === void 0 ? void 0 : this.cart) === null || _d === void 0 ? void 0 : _d.items[cartProductIndex]) === null || _e === void 0 ? void 0 : _e.quantity) + 1;
                updatedCartItems[cartProductIndex].quantity = newQuantity;
            }
            else {
                updatedCartItems.push({
                    productId: new mongodb_1.ObjectId(product === null || product === void 0 ? void 0 : product._id),
                    quantity: newQuantity,
                });
            }
            const updatedCart = {
                items: updatedCartItems,
            };
            return db
                .collection("users")
                .updateOne({ _id: new mongodb_1.ObjectId(this._id) }, { $set: { cart: updatedCart } })
                .then((result) => {
                console.log("Added the cart", result);
                return result;
            })
                .catch((err) => console.log("Logging error", err));
        }
        return Promise.resolve();
    }
    getCart() {
        var _a;
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            const productIds = (_a = this === null || this === void 0 ? void 0 : this.cart) === null || _a === void 0 ? void 0 : _a.items.map((item) => item === null || item === void 0 ? void 0 : item.productId);
            return db
                .collection("products")
                .find({ _id: { $in: productIds } })
                .toArray()
                .then((products) => {
                return products === null || products === void 0 ? void 0 : products.map((p) => (Object.assign(Object.assign({}, p), { quantity: this.cart.items.find((i) => {
                        var _a;
                        return (i === null || i === void 0 ? void 0 : i.productId.toString()) === ((_a = p === null || p === void 0 ? void 0 : p._id) === null || _a === void 0 ? void 0 : _a.toString());
                    }).quantity })));
            })
                .catch((err) => console.log("Logging get cart products error", err));
        }
        return Promise.resolve();
    }
    deleteCartItem(prodId) {
        var _a;
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            const updatedCartItems = (_a = this.cart.items) === null || _a === void 0 ? void 0 : _a.filter((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.productId) === null || _a === void 0 ? void 0 : _a.toString()) !== prodId.toString(); });
            return db
                .collection("users")
                .updateOne({ _id: new mongodb_1.ObjectId(this === null || this === void 0 ? void 0 : this._id) }, { $set: { cart: { items: updatedCartItems } } })
                .then((result) => {
                console.log("cart Item deleted", result);
            })
                .catch((err) => {
                console.log("Logging delete cart error", err);
            });
        }
        return Promise.resolve();
    }
    addOrder() {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return this.getCart()
                .then((products) => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb_1.ObjectId(this._id),
                        name: this === null || this === void 0 ? void 0 : this.name,
                    },
                };
                return db.collection("orders").insertOne(order);
            })
                .then((result) => {
                this.cart = { items: [] };
                return db
                    .collection("user")
                    .updateOne({ _id: new mongodb_1.ObjectId(this === null || this === void 0 ? void 0 : this._id) }, { $set: { cart: { items: [] } } });
            });
        }
        return Promise.resolve();
    }
    getOrders() {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db
                .collection("orders")
                .find({ "user._id": new mongodb_1.ObjectId(this === null || this === void 0 ? void 0 : this._id) })
                .toArray();
        }
        return Promise.resolve();
    }
    static findById(userId) {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db.collection("users").findOne({ _id: new mongodb_1.ObjectId(userId) });
            // .then((users) => {
            //   console.log("Logging user", users);
            //   return users;
            // })
            // .catch((err) => console.log("Logging find users errors", err));
        }
        return Promise.resolve();
    }
}
exports.default = User;
