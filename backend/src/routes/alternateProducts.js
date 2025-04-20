const express = require('express');
const router = express.Router();
const alternateProductService = require('../services/alternateProductService');

// Get alternate products based on search query
router.get('/similar', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const alternateProducts = await alternateProductService.findAlternateProducts(query);
        res.json(alternateProducts);
    } catch (error) {
        console.error('Error in alternate products route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get specific product details
router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const productDetails = await alternateProductService.getProductDetails(productId);
        
        if (!productDetails) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(productDetails);
    } catch (error) {
        console.error('Error in product details route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 