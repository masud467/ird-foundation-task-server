const sqlite3 = require("sqlite3").verbose();

// Connect to the database
const db = new sqlite3.Database(
  "./dua_main.sqlite",
  {
    timeout: 10000, // 10 second timeout
  },
  (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

module.exports = db;
