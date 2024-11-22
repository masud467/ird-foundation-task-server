const express = require("express");
const db = require("../db");
const router = express.Router();

// Get duas by subcategory ID
router.get("/:subcategoryId", (req, res) => {
  const { subcategoryId } = req.params;
  const query = "SELECT * FROM duas WHERE subcategory_id = ?"; // Replace with your actual table name and column
  db.all(query, [subcategoryId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
