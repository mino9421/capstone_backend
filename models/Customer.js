const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,    
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    vaccinated: {
        type: Boolean, 
        default: false,
    },
    symptoms: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
        enum: ['customer', 'restaurant', 'admin'],
        lowercase:true
      }
});


//Writing Query Helpers
CustomerSchema.query.byEmail = function(mail,pass){
    return this.where({email: mail}).where({password: pass})
  }
  

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;