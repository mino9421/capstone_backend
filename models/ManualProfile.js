const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
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
    created: { 
        type: Date,
        default: Date.now,
        alias: 'createdat'
    },
    reportingRestaurant: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },

});  

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;