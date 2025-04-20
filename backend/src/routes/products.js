const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error in GET /products route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(`Error in GET /products/${req.params.id} route:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const products = await productService.searchProducts(req.params.query);
    res.json(products);
  } catch (error) {
    console.error(`Error in GET /products/search/${req.params.query} route:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await productService.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    console.error(`Error in GET /products/category/${req.params.category} route:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error in POST /products route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(`Error in PUT /products/${req.params.id} route:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(`Error in DELETE /products/${req.params.id} route:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get similar products
router.get('/:id/similar', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const similarProducts = await productService.findSimilarProducts(req.params.id, limit);
    res.json(similarProducts);
  } catch (error) {
    console.error(`Error in GET /products/${req.params.id}/similar route:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 