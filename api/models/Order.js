const db = require('../../config/knexDB/knexconfig.js');

const Order = db.Model.extend({
  tableName:'orders',
});

module.exports = Order;
