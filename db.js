const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(process.cwd(), "dua_main.sqlite");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Enable foreign keys
db.run("PRAGMA foreign_keys = ON");

// Configure connection settings
db.configure("busyTimeout", 30000);

module.exports = db;
