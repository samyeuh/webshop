const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/webshop', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

const initializeProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    const products = [
      { name: 'Produit 1', desc: 'Description du produit 1', price: 10 },
      { name: 'Produit 2', desc: 'Description du produit 2', price: 20 },
      { name: 'Produit 3', desc: 'Description du produit 3', price: 30 },
      { name: 'Produit 4', desc: 'Description du produit 4', price: 40 },
      { name: 'Produit 5', desc: 'Description du produit 5', price: 50 },
    ];
    await Product.insertMany(products);
    console.log('Produits d\'exemple ajoutés à la base de données');
  } else {
    console.log(`Nombre de produits existants: ${count}`);
  }
};

initializeProducts();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
