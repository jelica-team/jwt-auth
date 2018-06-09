const Order = require('../models/Order');
const orderRoutes = require('express').Router();
const db = require('../../config/knexDB/knexconfig.js');
const shortid = require('shortid');

orderRoutes.post('/createOrder', (req, res) => {
  if (!req.body.user_id) {
    res.send('Need Authorize');
  } else {
    db.knex.select('username').table('users')
      .where('id', req.body.user_id)
      .first()
      .then((user) => {
        const order = new Order({
          user_id: req.body.user_id,
          username: user.username,
          short_link: shortid.generate(),
          address: req.body.address,
          description: req.body.description,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        });
        order.save().then(() => {
          res.send('order has been saved');
        });
      });
  }
});

orderRoutes.get('/getOrders', async (req, res) => {
  res.send(await db.knex.select().table('orders').where('client_id', null).andWhere('isClose', false));
});

orderRoutes.get('/getOrdersForUser/:id', (req, res) => {
  if (!req.params.id) {
    res.send('Need Authorize');
  } else {
  db.knex.select().table('orders')
    .where('user_id', req.params.id)
    .andWhere('isClose', false)
    .then((orders) => {
      console.log(orders);
      res.send(orders);
    });
  }
});

orderRoutes.get('/user/:id', async (req, res) => {
    res.send(await db.knex.select().table('users').where('id', req.params.id));
});

orderRoutes.post('/takeOrder', (req, res) => {
  if (req.body.user_id != req.body.client_id) {
    db.knex.select('client_id').table('orders')
      .where('short_link', req.body.short_link)
      .update({client_id: req.body.client_id})
      .then(res.send("take order " + req.body.short_link + " for user " + req.body.client_id));
  }
});

orderRoutes.post('/closeOrder', (req, res) => {
  db.knex('orders')
    .where('user_id', req.body.user_id)
    .andWhere('short_link', req.body.short_link)
    .first()
    .then((order) => {
      res.send(order);
    });

  db.knex('orders')
    .where('user_id', req.body.user_id)
    .andWhere('short_link', req.body.short_link)
    .del()
    .then();
});

orderRoutes.post('/close', (req, res) => {
  db.knex('orders')
    .where('user_id', req.body.user_id)
    .andWhere('short_link', req.body.short_link)
    .update({isClose: true})
    .first()
    .then((order) => {
      res.send(order);
    });
});

orderRoutes.get('/ordersForRate/:id', (req, res) => {
  db.knex('orders').select('user_id', 'client_id', 'description')
    .where('user_id', req.params.id)
    .andWhere('isClose', true)
    .then((order) => {
      res.send(order);
    });
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
