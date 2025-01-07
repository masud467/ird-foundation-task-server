const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all subcategories
router.get("/", (req, res) => {
  const query = "SELECT * FROM sub_category";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error running query:", err.message);
      res
        .status(500)
        .json({ error: "Database query failed", details: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Get subcategories by category ID
router.get("/category/:cat_id", (req, res) => {
  const catId = req.params.cat_id;
  const query = "SELECT * FROM sub_category WHERE cat_id = ?";
  db.all(query, [catId], (err, rows) => {
    if (err) {
      console.error("Error running query:", err.message);
      res
        .status(500)
        .json({ error: "Database query failed", details: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
