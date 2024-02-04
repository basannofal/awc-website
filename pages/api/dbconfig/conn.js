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

// const pool = mysql.createPool({
//   host: "178.16.139.144",
//   user: "root",
//   password: "Ansi@#2023",
//   database: "awc",
// });

// const pool = mysql.createPool({
//   host: "aufcart.com",
//   user: "valudaaa_awc_db",
//   password: "A*244-yi+2b4",
//   database: "valudaaa_awc_db",
// });

// const pool = mysql.createPool({
//   host: "valudas.com",
//   user: "valudas_awc",
//   password: "yya94Z3.B9sl",
//   database: "valudas_awc",
// });

const conn = pool.promise();

export default conn;
