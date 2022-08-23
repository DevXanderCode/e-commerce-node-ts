"use strict";
// import mysql  from 'mysql2';
Object.defineProperty(exports, "__esModule", { value: true });
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.dbUser,
//     database: process.env.dbName,
//     password: process.env.dbPassword
// });
// export default pool.promise();
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql",
    host: dbHost,
});
exports.default = sequelize;
