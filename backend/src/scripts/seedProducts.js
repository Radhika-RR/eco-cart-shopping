const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });
const Product = require('../models/Product');

// Sample product data
const sampleProducts = [
  {
    name: 'Organic Cotton T-Shirt',
    description: 'A comfortable and eco-friendly t-shirt made from 100% organic cotton.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    brand: 'EcoWear',
    inStock: true,
    rating: 4.5,
    numReviews: 12,
    tags: ['organic', 'cotton', 't-shirt', 'sustainable']
  },
  {
    name: 'Bamboo Kitchen Utensils Set',
    description: 'A set of 5 bamboo kitchen utensils, perfect for eco-conscious cooking.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
    brand: 'GreenHome',
    inStock: true,
    rating: 4.8,
    numReviews: 8,
    tags: ['bamboo', 'kitchen', 'utensils', 'sustainable']
  },
  {
    name: 'Recycled Paper Notebook',
    description: 'A notebook made from 100% recycled paper, perfect for eco-friendly note-taking.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Stationery',
    brand: 'EcoNotes',
    inStock: true,
    rating: 4.2,
    numReviews: 15,
    tags: ['recycled', 'paper', 'notebook', 'sustainable']
  },
  {
    name: 'Solar-Powered Phone Charger',
    description: 'A portable phone charger that uses solar energy to charge your devices.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    brand: 'SunPower',
    inStock: true,
    rating: 4.7,
    numReviews: 10,
    tags: ['solar', 'charger', 'electronics', 'sustainable']
  },
  {
    name: 'Hemp Shopping Bag',
    description: 'A durable shopping bag made from hemp, perfect for reducing plastic waste.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1594378987571-ffd9a1c3b9b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    brand: 'EcoBag',
    inStock: true,
    rating: 4.6,
    numReviews: 7,
    tags: ['hemp', 'bag', 'shopping', 'sustainable']
  },
  {
    name: 'Natural Beeswax Food Wraps',
    description: 'Reusable food wraps made from beeswax, perfect for storing food without plastic.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
    brand: 'BeeWrap',
    inStock: true,
    rating: 4.9,
    numReviews: 20,
    tags: ['beeswax', 'food', 'wraps', 'sustainable']
  },
  {
    name: 'Organic Cotton Jeans',
    description: 'Stylish jeans made from organic cotton, perfect for eco-conscious fashion.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    brand: 'EcoWear',
    inStock: true,
    rating: 4.4,
    numReviews: 9,
    tags: ['organic', 'cotton', 'jeans', 'sustainable']
  },
  {
    name: 'Bamboo Toothbrush',
    description: 'An eco-friendly toothbrush made from bamboo, perfect for reducing plastic waste.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Personal Care',
    brand: 'EcoBrush',
    inStock: true,
    rating: 4.7,
    numReviews: 25,
    tags: ['bamboo', 'toothbrush', 'personal care', 'sustainable']
  },
  {
    name: 'Recycled Glass Water Bottle',
    description: 'A stylish water bottle made from recycled glass, perfect for reducing plastic waste.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    brand: 'EcoBottle',
    inStock: true,
    rating: 4.6,
    numReviews: 18,
    tags: ['glass', 'water bottle', 'recycled', 'sustainable']
  },
  {
    name: 'Organic Cotton Socks',
    description: 'Comfortable socks made from organic cotton, perfect for eco-conscious fashion.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    brand: 'EcoWear',
    inStock: true,
    rating: 4.3,
    numReviews: 11,
    tags: ['organic', 'cotton', 'socks', 'sustainable']
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eco-cart')
  .then(() => {
    console.log('Connected to MongoDB');
    return seedProducts();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Seed products
async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
} 