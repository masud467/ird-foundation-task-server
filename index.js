const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite setup
const DATABASE_FILE = "./dua_main.sqlite";
const db = new sqlite3.Database(DATABASE_FILE, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to the SQLite database!");
  }
});

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uoysey8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let mongoDuaCollection;

// Connect to MongoDB
client.connect()
  .then(() => {
    const database = client.db("duaDB");
    mongoDuaCollection = database.collection("dua");
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// SQLite Endpoints
// Create the 'categories' table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`, (err) => {
  if (err) {
    console.error("Error creating categories table:", err.message);
  } else {
    console.log("Categories table is ready!");
  }
});

// Endpoint to add a new category
app.post("/categories", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  db.run(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name });
    }
  );
});
// Fetch all categories
app.get("/categories", (req, res) => {
  db.all("SELECT * FROM categories", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Fetch subcategories by category ID
app.get("/categories/:id/subcategories", (req, res) => {
  const categoryId = req.params.id;
  db.all("SELECT * FROM subcategories WHERE category_id = ?", [categoryId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Fetch duas by subcategory ID
app.get("/subcategories/:id/duas", (req, res) => {
  const subcategoryId = req.params.id;
  db.all("SELECT * FROM duas WHERE subcategory_id = ?", [subcategoryId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// MongoDB Endpoints

// Fetch duas from MongoDB
app.get("/duas", (req, res) => {
  mongoDuaCollection.find().toArray((err, duas) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(duas);
    }
  });
});

// Add a new dua to MongoDB (POST endpoint)
app.post("/duas", (req, res) => {
  const dua = req.body; // Expecting { title: '...', content: '...' }
  mongoDuaCollection.insertOne(dua, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: "Dua added successfully!", dua: result.ops[0] });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
