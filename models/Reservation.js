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
    complete: {
        type: Boolean,
        default: false,
    },
    noShow: {
        type: Boolean,
        default: false,
    },
});

//Writing Query Helpers
ReservationSchema.query.byCustomer = function(id){
    return this.where({reservation_maker: id})
}

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;