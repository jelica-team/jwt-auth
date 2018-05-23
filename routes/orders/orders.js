const router = require('express').Router();
const createOrder = require('./createOrder');


orderRoutes.use('/createOrder', createOrder);

module.exports = orderRoutes;
