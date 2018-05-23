const getOrderRoutes = require('express').Router();
const Order = require('../../models/order');
const db = require('../../database/app');

getOrderRoutes.get('/getOrders', (req,res) => {
  response = db.knex.select().table('orders').then(function(orders){
  console.log(orders);
  });
});

module.exports = getOrderRoutes;
