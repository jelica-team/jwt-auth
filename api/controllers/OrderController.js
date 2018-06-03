const Order = require('../models/Order');
const orderRoutes = require('express').Router();
const db = require('../../config/knexDB/knexconfig.js');
var shortid = require('shortid');

orderRoutes.post('/createOrder', (req,res) => {
  const order = new Order({
    userName: req.body.userName,
    address: req.body.address,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  order.save().then(() => {
    res.send('order has been saved');
    setTimeout(link => setLink(order), 1000);
  });
});

orderRoutes.get('/getOrders', (req,res) => {
  response = db.knex.select().table('orders').then(function(orders){
  console.log(orders);
  res.send(orders);
  });
});

function setLink(order) {
  db.knex('orders')
    .select('id')
    .where('userName', order.attributes.userName)
    .andWhere('address', order.attributes.address)
    .andWhere('description', order.attributes.description)
    .andWhere('latitude', order.attributes.latitude)
    .andWhere('longitude', order.attributes.longitude)
    .update({short_link: shortid.generate()})
    .then();
}

module.exports = orderRoutes;
