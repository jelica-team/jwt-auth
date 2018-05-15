const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const parser = require('body-parser');
const knex = require('knex');
const knexDb = knex ({client: 'pg',
                      connection:{
                          host: '127.0.0.1',
                          user: 'postgres',
                          password: 'ef91ckut',
                          database: 'map_db'
                      }
});
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const db = bookshelf(knexDb);
const jwt  = require('jsonwebtoken');
db.plugin(securePassword);

const User = db.Model.extend({
    tableName: 'login_user',
    hasSecurePassword: true
});

const Placemarker = db.Model.extend({
    tableName: 'placemarkers'
});


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new JwtStrategy(opts, (payload,next) => {
  //TODO: GET USER FROM DB
  User.forge({id: payload.id}).fetch().then(res => {
      next(null, res);
  });
});

passport.use(strategy);
app.use(passport.initialize());
app.use(parser.urlencoded({
    extended:false
}));
app.use(parser.json());

app.use(express.static('public'));

app.get('/', (req,res) => {
  res.rendex('index.html');
});

// не забыть убрать
app.get('/placemarkers', function(req, res) {
  knexDb.raw('select * from placemarkers').then(function(placemarkers) {
    res.send(placemarkers);
  });
});

app.post('/newPlacemarker', (req,res) => {
  const placemarker = new Placemarker({
      user_id: req.body.user_id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      hintContent: req.body.hintContent,
      balloonContent: req.body.balloonContent,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at
  });

  placemarker.save().then(() => {res.send('placemarker done');});
});

app.post('/axios', (req,res) => {
  console.log(req.body);
  res.send('k');
});

app.post('/seedUser', (req,res) => {
  const user = new User({
      email: req.body.email,
      password: req.body.password
  });

  user.save().then(() => {res.send('ok');});
});

app.post('/getToken', (req,res) => {
   if(!req.body.email || !req.body.password){
       return res.status(401).send('Fields not sent');
   }

   User.forge({email: req.body.email}).fetch().then(result =>{
       if(!result){
           return result.status(400).send('user not found');
       }
       result.authenticate(req.body.password).then(user =>{
           const payload = { id : user.id };
           const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
           res.send(token);
       }).catch(err =>{
           return res.status(401).send({ err: err });
       });
   });
});

app.get('/protected' , passport.authenticate('jwt', { session:false }), (req, res) => {
   res.send('i\'m protected');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);