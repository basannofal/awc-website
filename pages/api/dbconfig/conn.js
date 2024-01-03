import mysql from "mysql2";

// const pool = mysql.createPool({
//   host: "localhost",
//   // port: 'YOUR_MYSQL_PORT', // Typically 3306
//   user: "root",
//   password: "",
//   database: "awc_db",
//   connectionLimit: 10,
// });

const pool = mysql.createPool({
  host: "aufcart.com",
  // port: 'YOUR_MYSQL_PORT', // Typically 3306
  user: "valudaaa_awc_db",
  password: "A*244-yi+2b4",
  database: "valudaaa_awc_db",
});
const conn = pool.promise();

export default conn;
