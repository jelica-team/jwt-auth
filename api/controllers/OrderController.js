const Order = require('../models/Order');
const orderRoutes = require('express').Router();
const db = require('../../config/knexDB/knexconfig.js');
const shortid = require('shortid');

orderRoutes.post('/createOrder', (req, res) => {
  if (!req.session.user_id) {
    res.send('Need Authorize');
  } else {
    const order = new Order({
      user_id: req.session.user_id,
      short_link: shortid.generate(),
      address: req.body.address,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    order.save().then(() => {
      res.send('order has been saved');
    });
  }
});

orderRoutes.get('/getOrders', (req, res) => {
  db.knex.select().table('orders').then((orders) => {
    console.log(orders);
    res.send(orders);
  });
});

orderRoutes.get('/getOrdersForUser', (req, res) => {
  db.knex.select().table('orders')
    .where('user_id', req.session.user_id)
    .then((orders) => {
      console.log(orders);
      res.send(orders);
    });
});

orderRoutes.post('/takeOrder', (req, res) => {
  db.knex.select('client_id').table('orders')
    .where('short_link', req.body.short_link)
    .update({client_id: req.session.user_id})
    .then(res.send("take order " + req.body.short_link + " for user " + req.session.user_id));
});

orderRoutes.post('/closeOrder', (req, res) => {
  db.knex('orders')
    .where('user_id', req.session.user_id)
    .andWhere('short_link', req.body.short_link)
    .first()
    .then((order) => {
      res.send(order.client_id);
    });

  db.knex('orders')
    .where('user_id', req.session.user_id)
    .andWhere('short_link', req.body.short_link)
    .del()
    .then();
});

orderRoutes.post('/rateUser', (req, res) => {
  db.knex('users').select()
    .where('id', req.body.user_id)
    .first()
    .then((user) => {
      var newrating = (parseFloat(user.count_rating) * parseFloat(user.rating) + parseFloat(req.body.value)) / (user.count_rating + 1);
      db.knex('users')
        .where('id', req.body.user_id)
        .update({
          count_rating: user.count_rating + 1,
          rating: newrating,
        })
        .then();
      res.send("rating update for user " + user.id);
    });
});

module.exports = orderRoutes;
