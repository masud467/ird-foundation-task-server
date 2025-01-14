const express = require("express");
const app = express();
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 });

// Middleware
app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ird-f-task-client.vercel.app"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Cache middleware
const cacheMiddleware = (duration) => (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  res.originalJson = res.json;
  res.json = (body) => {
    cache.set(key, body, duration);
    res.originalJson(body);
  };
  next();
};

// Routes
const categoriesRouter = require("./routes/categories");
const subcategoriesRouter = require("./routes/subcategories");
const duasRouter = require("./routes/duas");

app.use("/categories", cacheMiddleware(3000), categoriesRouter);
app.use("/subcategories", cacheMiddleware(3000), subcategoriesRouter);
app.use("/duas", cacheMiddleware(3000), duasRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
