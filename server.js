

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');
const bodyParser = require('body-parser')

const app = express();

const PORT = process.env.PORT || 8080;// env file assign

// Middleware
//app.use(express.json()); // Parse JSON request bodies (not needed I believe)

// MongoDB connection 
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/items', itemRoutes);

// Export the app as a serverless function
//module.exports.handler = serverless(app);



//listen
app.listen(PORT, () => {
  console.log('nomming at port ' + PORT)
})

