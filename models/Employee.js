const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    works_at: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    manageReservations: {
        type: Boolean,
        default: false,
    },
    manageEmployees: {
        type: Boolean,
        default: false,
    },
    EditProfile: {
        type: Boolean,
        default: false,
    },
});


const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;