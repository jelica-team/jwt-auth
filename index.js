require('dotenv').config();
const express = require('express');
const app = new express();
const parser = require('body-parser');
const passport = require('./jwtConfig/passport');
const authRoutes = require('./routes/auth/auth');
const orderRoutes = require('./routes/orders/createOrder');
const getOrderRoutes = require('./routes/orders/getOrders');
var cors = require('cors');

app.use(passport.initialize());
app.use(parser.urlencoded({
    extended:false
}));
app.use(parser.json());
app.use(authRoutes);
app.use(orderRoutes);
app.use(getOrderRoutes);


/*app.post('/createOrder', (req,res) => {
  const order = new Order({
    userName: req.body.userName,
    address: req.body.address,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  order.save().then(() => {res.send('order has been saved');});
});*/



// use it before all route definitions
app.use(cors({origin: 'null'}));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
