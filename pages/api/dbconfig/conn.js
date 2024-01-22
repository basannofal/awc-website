import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "awc_db",
  connectionLimit: 10,
});

// const pool = mysql.createPool({
//   host: "valudas.com",
//   user: "valudas_awc",
//   password: "yya94Z3.B9sl",
//   database: "valudas_awc",
// });

const conn = pool.promise();

export default conn;
