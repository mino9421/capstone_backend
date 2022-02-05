const express = require('express');
const customerModel = require('../models/customer');
const app = express();


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

module.exports = app