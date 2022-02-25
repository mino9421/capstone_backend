const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;