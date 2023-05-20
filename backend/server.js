const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection
const uri = 'mongodb+srv://jiff3:AZOzXtaEaNAmvv6j@baggies.ayk7doq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas!');
});

// Define schema for your collection
const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  quantity: Number,
  price: Number,
  supplier: String
});

// Define your endpoint
app.get('/getitems/:collection', async (req, res) => {
  const collectionName = req.params.collection;

  // Assuming that the collection name matches with the model name
  try {
    //const Item = mongoose.model(collectionName, itemSchema);
    //const items = await mongoose.model(collectionName).find({}, itemSchema);
    console.log(db.collections);
    res.json(db.collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Define model
// const Item = mongoose.model('Item', itemSchema);

// app.get('/getitem/:name', async (req, res) => {
//   const itemName = req.params.name;
//   console.log(itemName);
//   const item = await Item.findOne({ name: itemName }); // Retrieves one item from collection
//   if (!item) {
//     return res.status(404).send('Item not found');
//   }
//   res.json(item);
//   res.send(item);
// });


app.get("/", (req, res) => {
  res.send("connected");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening the port http://localhost/" + port);
});