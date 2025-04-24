

const mongoose = require('mongoose')

// creating shorthand for the Schema constructor 
const { Schema } = mongoose 



const userSchema = new Schema({

    location: { type: String, required: true },
    item: { type: String, required: true },
   

})

const Junk = mongoose.model('Junk', userSchema)
module.exports = Junk


