const mongoose = require('mongoose');
 
var menuSchema = new mongoose.Schema({
    menu_for: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Menu is a model which has a schema menuSchema
 
module.exports = new mongoose.model('Menu', menuSchema);
