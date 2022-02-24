const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    reservation_maker: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    reservation_at: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    numGuests: {
        type: Number,
        required: true,    
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    }
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;