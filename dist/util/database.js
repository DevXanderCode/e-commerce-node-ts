"use strict";
// import mysql  from 'mysql2';
Object.defineProperty(exports, "__esModule", { value: true });
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-ecommerce',
//     password: 'Nweke@!ex'
// });
// export default pool.promise();
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("node-ecommerce", "root", "Nweke@!ex", {
    dialect: "mysql",
    host: "localhost",
});
exports.default = sequelize;
