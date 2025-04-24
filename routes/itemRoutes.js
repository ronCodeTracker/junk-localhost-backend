

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router();
const Junk = require("../models/junk")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}

))
// Define the Mongoose schema and model
//const itemSchema = new mongoose.Schema({
//    location: { type: String, required: true },
//    item: { type: String, required: true },
 // });

//const Item = mongoose.model('Item', itemSchema);

// POST: Add a new item
router.post('/',  (req, res) => {
     
    console.log("started post route");
    console.log("Parsed request body:", req.body); // Debug log
  
    const reqBody = req.body.location;
    const reqBody2 = req.body.item;
    console.log("Parsed request body:", reqBody); // Debug log
    console.log("Parsed request body2:", reqBody2); // Debug log



    //if (!location || !item) {
     // return res.status(400).json({ error: 'Both location and item are required' });
    //}

    //const newItem = new Item({ location, item });
    //await newItem.save();
   // res.status(201).json({ message: 'Item saved successfully', item: newItem });
  
  
   const location = req.body.location
   const item = req.body.item
   //const email = req.body.email
   //const password = req.body.password



   const objectUser = new Object({
    location,
    item   
     })
  console.log("objectUser:  " + objectUser.location);
  
   Junk.create(objectUser)
          .then((junk) => {
              console.log(junk)
              return res.json(junk)
          })
          .catch(err => {
              console.log("err", err)
          })
  
  
  
});

// GET: Retrieve all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



