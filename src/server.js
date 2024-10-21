require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_URI;


app.use(express.json());


app.use(express.static(path.join(__dirname, '../public')));


app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


mongoose.connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;