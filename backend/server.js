const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection
const uri = 'mongodb+srv://jiff3:AZOzXtaEaNAmvv6j@baggies.ayk7doq.mongodb.net/Aggie_Reuse_Inventory?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas!');
});

// Define schema for collection
const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  quantity: Number,
  price: Number,
  supplier: String
});

// Returns JSON of document of requested collection
app.get('/getitems/:collectionName', async (req, res) => {
  const name = req.params.collectionName;
  const Item = mongoose.model(name, itemSchema, name);
  const items = await Item.find({ });
  console.log(items);
  if (!items) {
    return res.status(404).send('Item not found');
  }
  res.json(items);
});


app.get("/", (req, res) => {
  res.send("connected");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening the port http://localhost/" + port);
});