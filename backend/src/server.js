const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const alternateProductsRouter = require('./routes/alternateProducts');
const productsRouter = require('./routes/products');

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/alternate-products', alternateProductsRouter);
app.use('/api/products', productsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 