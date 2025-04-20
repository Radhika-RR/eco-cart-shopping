const Product = require('../models/Product');

class AlternateProductService {
    async findAlternateProducts(searchQuery) {
        try {
            // Search for products in our database that match the query
            const products = await Product.find(
                { $text: { $search: searchQuery } },
                { score: { $meta: 'textScore' } }
            ).sort({ score: { $meta: 'textScore' } }).limit(5);

            // If no products found, return empty array
            if (!products || products.length === 0) {
                return [];
            }

            // Map the products to the expected format
            return products.map(product => ({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                similarityScore: product.score || 0
            }));
        } catch (error) {
            console.error('Error fetching alternate products:', error);
            return [];
        }
    }

    async getProductDetails(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return null;
            }
            
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                rating: product.rating,
                numReviews: product.numReviews,
                tags: product.tags
            };
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    }
}

module.exports = new AlternateProductService(); 