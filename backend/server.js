const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')
app.use(cors())

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

  // Gets all collections to check if requested collection exists
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);

  // If the collection requested doesn't exist, then return error
  if (!collectionNames.includes(name)) {
    return res.status(404).send('Collection not found');
  }

  const Item = mongoose.model(name, itemSchema, name);
  const items = await Item.find({ });
  console.log(items);

  if (items.length == 0) {
    return res.status(404).send('Item not found');
  }
  res.json(items);
});

// Route to update item quantity by its name
app.get('/updateitem/:collectionName/:name/:increment', async (req, res) => {
  const collectionName = req.params.collectionName;

  // Gets all collections to check if requested collection exists
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);

  // If the collection requested doesn't exist, then create a new one
  if (!collectionNames.includes(collectionName)) {
    // Initialize new collection with 20 new documents for each item
    const Item = mongoose.model(collectionName, itemSchema, collectionName);
    const newItems = [
      { id: 01, name: "Bag/Backpack", quantity: 0, price: 0, supplier: "None" },
      { id: 02, name: "Belt", quantity: 0, price: 0, supplier: "None" },
      { id: 03, name: "Books", quantity: 0, price: 0, supplier: "None" },
      { id: 04, name: "Dress", quantity: 0, price: 0, supplier: "None" },
      { id: 05, name: "Hat", quantity: 0, price: 0, supplier: "None" },
      { id: 06, name: "Household", quantity: 0, price: 0, supplier: "None" },
      { id: 07, name: "Jacket", quantity: 0, price: 0, supplier: "None" },
      { id: 08, name: "Long-sleeve/button-up", quantity: 0, price: 0, supplier: "None" },
      { id: 09, name: "Pants/Jeans", quantity: 0, price: 0, supplier: "None" },
      { id: 10, name: "Ring/Jewelry", quantity: 0, price: 0, supplier: "None" },
      { id: 11, name: "School_supplies", quantity: 0, price: 0, supplier: "None" },
      { id: 12, name: "Shirts", quantity: 0, price: 0, supplier: "None" },
      { id: 13, name: "Shoes", quantity: 0, price: 0, supplier: "None" },
      { id: 14, name: "Shorts", quantity: 0, price: 0, supplier: "None" },
      { id: 15, name: "Skirt", quantity: 0, price: 0, supplier: "None" },
      { id: 16, name: "Sunglasses", quantity: 0, price: 0, supplier: "None" },
      { id: 17, name: "Sweater/Cardigan", quantity: 0, price: 0, supplier: "None" },
      { id: 18, name: "Tank_top", quantity: 0, price: 0, supplier: "None" },
      { id: 19, name: "Tie", quantity: 0, price: 0, supplier: "None" },
      { id: 20, name: "Miscellaneous", quantity: 0, price: 0, supplier: "None" }
      ];
      await Item.insertMany(newItems);
  }

  const Item = mongoose.model(collectionName, itemSchema, collectionName);
  const name = req.params.name; // name stored in document
  let increment = Number(req.params.increment); // 0 means decrement by 1, 1 means increment by 1
  if(increment == 0){increment = -1;}

  try {
    const updatedItem = await Item.findOneAndUpdate(
      { name: name },
      { $inc: { quantity: increment } },
      { new: true } // This option returns the updated document
    );

    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get("/", (req, res) => {
  res.send("connected");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server listening the port http://localhost/" + port);
});










// Unused code for duplicating specified collection

    /*try {
      const Item = mongoose.model(name, itemSchema, name);
      const items = await Item.find({ }); // Creates collection with name var as its name

      // Create new documents in 'Items'
      const copiedItems = items.map(item => {
        // Remove '_id' property to avoid duplicate key error
        const { ...rest } = item._doc;
        return rest;
      });

      // Insert copied items into the 'Items' collection
      await Item.insertMany(copiedItems);

      res.status(200).send('Items collection has been duplicated into Items2');

    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }*/