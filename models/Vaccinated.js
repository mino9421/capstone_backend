const mongoose = require('mongoose')

const VaccinatedSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    vaccinated: {
        type: Boolean,
        default: false,
    },
});


const Vaccination = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;