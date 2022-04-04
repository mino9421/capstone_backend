const express = require('express');
const customerModel = require('../models/Customer');
const reservationModel = require('../models/Reservation')
const restaurantModel = require('../models/Restaurant')
const profileModel = require('../models/ManualProfile')
const employeeModel = require('../models/Employee')
const vaccinationModel = require('../models/Vaccination')
const app = express();

// login
app.post('/login', async (req, res)=>{
  console.log(req.body)
  const user = await customerModel.findOne().byEmail(req.body.email,req.body.password)
  try {
    if(user !== null){
      res.send({user});
    }else{
      res.send({user:{email:"Password or Username are incorrect"}});
    }
  } catch (err) {
    res.send({ error: err });
  }

});

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

// get customer by E-mail
app.post('/api/v1/newEmployee/', async (req, res) => {
  try {
      const customer = await customerModel.find({email: req.body.email})
      console.log(customer)
      res.send(customer)
  } catch(err) {
      res.status(500).send(err)
  }
})

// update customer by id
app.post('/api/v1/customers/:id', async (req, res) => {
    try {
      await customerModel.findByIdAndUpdate(req.params.id, req.body)
      res.send("Update Complete")
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

// update Reservation by id
app.post('/api/v1/reservation/:id', async (req, res) => {
  try {
    await reservationModel.findByIdAndUpdate(req.params.id, req.body)
    res.send("Update Complete")
  } catch (err) {
    res.status(500).send(err)
  }
})

// delete reservation
app.delete('/api/v1/reservation/:id', async (req, res) => {
  try {
    const reservation = await reservationModel.findByIdAndDelete(req.params.id)

    if (!reservation) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

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

//retrieve reservations at Restaurant
app.post('/api/v1/mealTime', async (req, res) => {
  const reservations = await reservationModel.find({ reservation_maker: req.body.user, reservation_at: req.body.restaurant });
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


//retrieve restaurant's reservations
app.post('/api/v1/restaurantReservations', async (req, res) => {
  const reservations = await reservationModel.find({ reservation_at: req.body.restaurant });
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



//create restaurant
app.post('/api/v1/restaurant', async (req, res) => {
  console.log(req.body.data)
  const restaurant = new restaurantModel(req.body);

  try {
    await restaurant.save();
    res.send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get restaurant by id
app.get('/api/v1/restaurant/:id', async (req, res) => {
  try {
      const restaurant = await restaurantModel.findById(req.params.id)
      res.send(restaurant)
  } catch(err) {
      res.status(500).send(err)
  }
})

//retrieve your restaurants
app.post('/api/v1/restaurants', async (req, res) => {
  const restaurants = await restaurantModel.find({ managed_by: req.body.manager });
  try {
      res.send({restaurants});
  } catch (err) {
    res.send({ error: err });
  }

});

//retrieve all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  const restaurants = await restaurantModel.find({});
  try {
      res.send({restaurants});
  } catch (err) {
    res.send({ error: err });
  }

});



//update Restaurant
app.post('/api/v1/restaurant/:id', async (req, res) => {
    try {
      await restaurantModel.findByIdAndUpdate(req.params.id, req.body)
      res.send("Update Complete")
    } catch (err) {
      res.status(500).send(err)
    }
})

//create Unregistered Profile
app.post('/api/v1/profile', async (req, res) => {
  console.log(req.body.data)
  const profile = new profileModel(req.body);

  try {
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
});

//retrieve your unregistered Profiles
app.post('/api/v1/profiles', async (req, res) => {
  const profiles = await profileModel.find({ reportingRestaurant: req.body.restaurant });
  try {
      res.send({profiles});
  } catch (err) {
    res.send({ error: err });
  }

});

//retrieve all employees at restaurant
app.get('/api/v1/employees/:id', async (req, res) => {
  const employees = await employeeModel.find({ works_at: req.params.id});
  try {
      res.send({employees});
  } catch (err) {
    res.send({ error: err });
  }

});

//retrieve all employee profiles of restaurants employed at
app.get('/api/v1/employed/:id', async (req, res) => {
  const employees = await employeeModel.find({ employee: req.params.id});
  try {
      res.send({employees});
  } catch (err) {
    res.send({ error: err });
  }

});

//create employee
app.post('/api/v1/employee', async (req, res) => {
  console.log(req.body.data)
  const employee = new employeeModel(req.body);

  try {
    await employee.save();
    res.send(employee);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update employee
app.post('/api/v1/roles/:id', async (req, res) => {
    try {
      await employeeModel.findByIdAndUpdate(req.params.id, req.body)
      res.send("Update Complete")
    } catch (err) {
      res.status(500).send(err)
    }
});

//check vaccine report
app.post('/api/v1/vaccineStatus', async (req, res) => {
  const vaccination = await vaccinationModel.find({ customer: req.body.customer, restaurant: req.body.restaurant });
  try {
    if(vaccination !== null){
      res.send({vaccination});
    }else{
      res.send({error:"No status reports were found"});
    }
  } catch (err) {
    res.send({ error: err });
  }

});


//confirm vaccination
app.post('/api/v1/vaccine', async (req, res) => {
  console.log(req.body.data)
  const vaccination = new vaccinationModel(req.body);

  try {
    await vaccination.save();
    res.send(vaccination);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update vaccination status
app.post('/api/v1/vaccination/:id', async (req, res) => {
  try {
    await vaccinationModel.findByIdAndUpdate(req.params.id, req.body)
    res.send("Update Complete")
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = app