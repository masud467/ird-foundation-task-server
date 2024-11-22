const express = require("express");
const db = require("../db");
const router = express.Router();

// Get duas by subcategory ID
router.get("/", (req, res) => {
  const { subcategoryId } = req.params;
  const query = "SELECT * FROM dua"; // Replace with your actual table name and column
  db.all(query, [subcategoryId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(rows);
    }
  });
});

// Get duas by category ID
router.get('/category/:cat_id', (req, res) => {
  const catId = req.params.cat_id;
  const query = 'SELECT * FROM dua WHERE cat_id = ?';
  db.all(query, [catId], (err, rows) => {
      if (err) {
          console.error('Error fetching duas by category:', err.message);
          res.status(500).json({ error: 'Database query failed', details: err.message });
      } else {
          res.status(200).json(rows);
      }
  });
});

// Get duas by subcategory ID
router.get('/subcategory/:subcat_id', (req, res) => {
  const subcatId = req.params.subcat_id;
  const query = 'SELECT * FROM dua WHERE subcat_id = ?';
  db.all(query, [subcatId], (err, rows) => {
      if (err) {
          console.error('Error fetching duas by subcategory:', err.message);
          res.status(500).json({ error: 'Database query failed', details: err.message });
      } else {
          res.status(200).json(rows);
      }
  });
});


module.exports = router;
