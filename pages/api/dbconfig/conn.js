import mysql from "mysql2";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "awc_db",
//   connectionLimit: 10,
// });

const pool = mysql.createPool({
  host: "aufcart.com",
  user: "valudaaa_awc_db",
  password: "A*244-yi+2b4",
  database: "valudaaa_awc_db",
});
const conn = pool.promise();

export default conn;
