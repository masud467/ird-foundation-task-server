const express = require('express');
const router = express.Router();
const db = require('../db');

// Get subcategories by category ID
router.get('/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const query = 'SELECT * FROM subcategories WHERE category_id = ?'; // Replace with your actual table name and column
    db.all(query, [categoryId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
