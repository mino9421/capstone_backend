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
    }
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;