const orderRoutes = require('express').Router();
const Order = require('../../models/order');

orderRoutes.post('/createOrder', (req,res) => {
  const order = new Order({
    userName: req.body.userName,
    address: req.body.address,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  order.save().then(() => {res.send('order has been saved');});
});

module.exports = orderRoutes;
