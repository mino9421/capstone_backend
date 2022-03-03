const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    managed_by: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },
    Description: {
        type: String,
        trim: true,
    },
    Address: {
        type: String,
        required: true,
    },
    MenuFileName: {
        type: String,
    },
    Style: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    opening_hours: {
        normal_days: {
            mon: {
                startHours: { type: Number, min: 0, max: 23 },
                startMinutes: { type: Number, min: 0, max: 59 },
                endHours: { type: Number, min: 0, max: 23 },
                endMinutes: { type: Number, min: 0, max: 59 },
                is_closed: {type: Boolean, default: false},
            },
            tue: {
                startHours: { type: Number, min: 0, max: 23 },
                startMinutes: { type: Number, min: 0, max: 59 },
                endHours: { type: Number, min: 0, max: 23 },
                endMinutes: { type: Number, min: 0, max: 59 },
                is_closed: {type: Boolean, default: false},
            },
            wed: {
                startHours: { type: Number, min: 0, max: 23 },
                startMinutes: { type: Number, min: 0, max: 59 },
                endHours: { type: Number, min: 0, max: 23 },
                endMinutes: { type: Number, min: 0, max: 59 },
                is_closed: {type: Boolean, default: false},
            },
            thu: {
                startHours: { type: Number, min: 0, max: 23 },
                startMinutes: { type: Number, min: 0, max: 59 },
                endHours: { type: Number, min: 0, max: 23 },
                endMinutes: { type: Number, min: 0, max: 59 },
                is_closed: {type: Boolean, default: false},
            },
            fri: {
                startHours: { type: Number, min: 0, max: 23 },
                startMinutes: { type: Number, min: 0, max: 59 },
                endHours: { type: Number, min: 0, max: 23 },
                endMinutes: { type: Number, min: 0, max: 59 },
                is_closed: {type: Boolean, default: false},
            },
            sat: {
                startHours: { type: Number, min: 0, max: 23 },
                startMinutes: { type: Number, min: 0, max: 59 },
                endHours: { type: Number, min: 0, max: 23 },
                endMinutes: { type: Number, min: 0, max: 59 },
                is_closed: {type: Boolean, default: false},
            },
            sun: {
                startHours: { type: Number, min: 0, max: 23 },
                startMinutes: { type: Number, min: 0, max: 59 },
                endHours: { type: Number, min: 0, max: 23 },
                endMinutes: { type: Number, min: 0, max: 59 },
                is_closed: {type: Boolean, default: false},
            },
        },
    },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;