const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dumb-tick"
});
connection.connect();
module.exports = connection;