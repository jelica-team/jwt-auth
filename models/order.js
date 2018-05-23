const db = require('../database/app.js');

const Order = db.Model.extend({
  tableName:'orders',
});

module.exports = Order;
