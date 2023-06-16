

// const mongoose = require("mongoose");
// const axios = require('axios');

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/Assignment4', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Define a schema for products
// const ProductSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, unique: true },
//     desc: { type: String, required: true, },
//     img: { type: String, required: true },
//     categories: { type: Array },
//     size: { type: String },
//     color: { type: String },
//     price: { type: Number, required: true },
    
//   },
//   { timestamps: true }
// );
// // Define a model for products
// const Product = mongoose.model('Product', ProductSchema);

// // Fetch products from the FakeStoreAPI
// // Fetch products from the FakeStoreAPI
// axios.get('https://fakestoreapi.com/products')
//   .then(response => {
//     // Parse the products data
//     const products = response.data;

//     // Filter out any products that do not have the required fields
//     const validProducts = products.filter(p => p.img && p.desc);

//     // Store the valid products in the database
//     Product.insertMany(validProducts)
//       .then(() => {
//         console.log('Products stored successfully');
//       })
//       .catch(error => {
//         console.log('Error storing products: ', error);
//       });
//   })
//   .catch(error => {
//     console.log('Error fetching products: ', error);
//   });


  // import fetch from 'node-fetch'

  const fetch = require('node-fetch');

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  
  fetchProducts().then((data) => console.log(data));
  const { MongoClient } = require('mongodb');
  const uri = 'mongodb://127.0.0.1:27017/';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  const connectToMongo = async () => {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      const db = client.db('Assignment4');
      return db;
    } catch (err) {
      console.error(err);
    }
  };
  
  const insertProducts = async (db, products) => {
    const collection = db.collection('products');
    try {
      const result = await collection.insertMany(products);
      console.log(`${result.insertedCount} products inserted`);
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
    }
  };
  
  fetchProducts()
    .then((products) => connectToMongo().then((db) => insertProducts(db, products)))
    .catch((err) => console.error(err));
  
  


