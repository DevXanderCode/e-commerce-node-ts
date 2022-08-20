import mysql  from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-ecommerce',
    password: 'Nweke@!ex'
});

export default pool.promise();