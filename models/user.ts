// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";

import { ObjectId } from "mongodb";
import { getDb } from "../util/database";

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
  constructor(public name: string, public email: string) {}

  save() {
    const db = getDb();

    if (typeof db !== "string") {
      return db
        .collection("users")
        .insertOne({ name: this?.name, email: this?.name });
      // .then((result) => console.log("created user", result))
      // .catch((err) => console.log("Logging add user error", err));
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
