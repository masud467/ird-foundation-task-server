const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const categoriesRouter = require('./routes/categories');
const subcategoriesRouter = require('./routes/subcategories');
const duasRouter = require('./routes/duas');

app.use('/categories', categoriesRouter);
app.use('/subcategories', subcategoriesRouter);
app.use('/duas', duasRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
