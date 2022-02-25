const express = require('express');
const customerModel = require('../models/Customer');
const reservationModel = require('../models/Reservation')
const app = express();

// login
app.post('/login', async (req, res)=>{
  console.log(req.body)
  const user = await customerModel.findOne().byEmail(req.body.email,req.body.password)
  try {
    if(user !== null){
      res.send({user});
    }else{
      res.send({error:"Password or Username are incorrect"});
    }
  } catch (err) {
    res.send({ error: err });
  }

})


// get all customers
app.get('/api/v1/customers', async (req, res) => {
    const customers = await customerModel.find({});
  
    try {
      res.send({customers});
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
});

// create new customer
app.post('/api/v1/customers', async (req, res) => {
    console.log(req.body.data)
    const customer = new customerModel(req.body);

    try {
      await customer.save();
      res.send(customer);
    } catch (err) {
      res.status(500).send(err);
    }
});

// get customer by id
app.get('/api/v1/customers/:id', async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)
        console.log(customer)
        res.send(customer)
    } catch(err) {
        res.status(500).send(err)
    }
})

// update customer by id
app.put('/api/v1/customers/:id', async (req, res) => {
    try {
      await customerModel.findByIdAndUpdate(req.params.id, req.body)
      customerModel.save()
      res.send("Complete")
    } catch (err) {
      res.status(500).send(err)
    }
})

// delete customer
app.delete('/api/v1/customers/:id', async (req, res) => {
    try {
      const customer = await customerModel.findByIdAndDelete(req.params.id)
  
      if (!customer) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
})

//create reservation
app.post('/api/v1/reservations', async (req, res) => {
  console.log(req.body.data)
  const reservation = new reservationModel(req.body);

  try {
    await reservation.save();
    res.send(reservation);
  } catch (err) {
    res.status(500).send(err);
  }
});

//retrieve reservations
app.post('/api/v1/calendar', async (req, res) => {
  const reservations = await reservationModel.find({ reservation_maker: req.body.customer });
  try {
    if(reservations !== null){
      res.send({reservations});
    }else{
      res.send({error:"No reservations were found"});
    }
  } catch (err) {
    res.send({ error: err });
  }

});


module.exports = app