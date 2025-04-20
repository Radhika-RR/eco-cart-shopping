const Product = require('../models/Product');

class ProductService {
  // Get all products
  async getAllProducts() {
    try {
      const products = await Product.find({});
      return products;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  }

  // Get product by ID
  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  }

  // Search products
  async searchProducts(query) {
    try {
      const products = await Product.find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } });
      return products;
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error);
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const products = await Product.find({ category });
      return products;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    }
  }

  // Create a new product
  async createProduct(productData) {
    try {
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      console.error('Error creating new product:', error);
      throw error;
    }
  }

  // Update a product
  async updateProduct(productId, productData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true, runValidators: true }
      );
      return updatedProduct;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    }
  }

  // Delete a product
  async deleteProduct(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      throw error;
    }
  }

  // Find similar products
  async findSimilarProducts(productId, limit = 5) {
    try {
      // First get the product to find its category and tags
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Find similar products based on category and tags
      const similarProducts = await Product.find({
        _id: { $ne: productId }, // Exclude the current product
        $or: [
          { category: product.category },
          { tags: { $in: product.tags } }
        ]
      })
      .limit(limit);

      return similarProducts;
    } catch (error) {
      console.error(`Error finding similar products for ID ${productId}:`, error);
      throw error;
    }
  }
}

module.exports = new ProductService(); 