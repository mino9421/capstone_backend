const express = require('express');
const mongoose = require('mongoose');
const customerRouter = require('./routes/CustomerRoutes.js');
const bodyParser = require("body-parser");

var cors = require('cors')


const app = express();
app.use(express.json()); // Make sure it comes back as json


app.use(bodyParser.urlencoded(
  { extended:true }
))


//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://Jeremy:XwqTRgFXYy3DkWBP@comp3123.cfuyr.mongodb.net/passportMeals?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



app.use(cors())

app.use(customerRouter);

app.listen(9090, () => { console.log('Server is running...') });