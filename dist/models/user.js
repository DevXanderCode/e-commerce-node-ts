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
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    save() {
        const db = (0, database_1.getDb)();
        if (typeof db !== "string") {
            return db
                .collection("users")
                .insertOne({ name: this === null || this === void 0 ? void 0 : this.name, email: this === null || this === void 0 ? void 0 : this.name });
            // .then((result) => console.log("created user", result))
            // .catch((err) => console.log("Logging add user error", err));
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
