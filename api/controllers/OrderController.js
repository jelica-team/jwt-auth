const Order = require('../models/Order');
const orderRoutes = require('express').Router();
const db = require('../../config/knexDB/knexconfig.js');

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

orderRoutes.get('/getOrders', (req,res) => {
  response = db.knex.select().table('orders').then(function(orders){
  console.log(orders);
  res.send(orders);
  });
});

module.exports = orderRoutes;
