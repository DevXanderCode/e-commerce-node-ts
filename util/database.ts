// import mysql  from 'mysql2';

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-ecommerce',
//     password: 'Nweke@!ex'
// });

// export default pool.promise();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node-ecommerce", "root", "Nweke@!ex", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
