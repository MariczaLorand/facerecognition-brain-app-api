const express = require('express');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'mariczalorand',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());

app.get('/', (req, res) => { res.send(database.users)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
//imageurl endpoint : handleApiCall

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/sign in --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
 */