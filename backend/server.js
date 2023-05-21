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

function findPreviousDay(dateString) {
  // Parse the date
  let dateParts = dateString.split('/');
  let dateObject = new Date(+dateParts[2], dateParts[0] - 1, +dateParts[1]);

  // Subtract one day
  dateObject.setDate(dateObject.getDate() - 1);

  // Format the date in 'MM/DD/YY' format
  let year = dateObject.getFullYear().toString().substr(2, 2);
  let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  let day = dateObject.getDate().toString().padStart(2, '0');

  return `${month}/${day}/${year}`;
}

// Returns JSON of document of requested collection
app.get('/getitems/:collectionName', async (req, res) => {
  const name = req.params.collectionName;

  // Gets all collections to check if requested collection exists
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);

  // If the collection requested doesn't exist, then create a new one only if the collection requested is a date not in the future
  if (!collectionNames.includes(name)) {
    return res.status(404).send('Collectiom not found');
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
app.put('/updateitem/:collectionName/:name/:increment', async (req, res) => {
  const collectionName = req.params.collectionName;
  const Item = mongoose.model(name, itemSchema, name);
  const { name } = req.params.name; // name stored in document
  const { increment } = req.params.increment; // 0 means decrement by 1, 1 means increment by 1
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