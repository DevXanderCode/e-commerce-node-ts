// import mysql  from 'mysql2';

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.dbUser,
//     database: process.env.dbName,
//     password: process.env.dbPassword
// });

// export default pool.promise();

// import { Sequelize, Dialect } from "sequelize";
// import "dotenv/config";

// const dbName = process.env.DB_NAME as string;
// const dbUser = process.env.DB_USER as string;
// const dbHost = process.env.DB_HOST;
// const dbDriver = process.env.DB_DRIVER as Dialect;
// const dbPassword = process.env.DB_PASSWORD;

// const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//   dialect: dbDriver,
//   host: dbHost,
// });

// export default sequelize;

import { MongoClient, ServerApiVersion } from "mongodb";

let mongoUri =
  "mongodb+srv://alex:xWK1p6bwKRGl1QuH@cluster0.qy8tddy.mongodb.net/test?retryWrites=true&w=majority";

let _db;
const mongoConnect = (callback: Function) => {
  MongoClient.connect(mongoUri)
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("Logging mongo connection error", err);
      throw err;
    });
};

export default mongoConnect;
