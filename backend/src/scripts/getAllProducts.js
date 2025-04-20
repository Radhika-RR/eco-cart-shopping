const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eco-cart')
  .then(() => {
    console.log('Connected to MongoDB');
    return getAllProducts();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Get all products
async function getAllProducts() {
  try {
    // Fetch all products
    const products = await Product.find({});
    
    // Display product count
    console.log(`Found ${products.length} products in the database:`);
    console.log('----------------------------------------');
    
    // Display each product
    products.forEach((product, index) => {
      console.log(`Product ${index + 1}:`);
      console.log(`ID: ${product._id}`);
      console.log(`Name: ${product.name}`);
      console.log(`Description: ${product.description}`);
      console.log(`Price: $${product.price}`);
      console.log(`Category: ${product.category}`);
      console.log(`Brand: ${product.brand}`);
      console.log(`In Stock: ${product.inStock ? 'Yes' : 'No'}`);
      console.log(`Rating: ${product.rating} (${product.numReviews} reviews)`);
      console.log(`Tags: ${product.tags.join(', ')}`);
      console.log('----------------------------------------');
    });
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }
} 