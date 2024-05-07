 if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
 }

//const db = require("./database.js");
var cors = require('cors');

// Enable CORS for all origins
const express = require("express")
const app = express();
app.use(cors());
const expressLayouts = require('express-ejs-layouts')

app.set("view engine", "ejs")
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("connected mongoose"))

const port = process.env.PORT || 8000;
const indexRouter = require('./routes/index')
const userRouter = require('./')
const database = require( "./database");
const bcrypt = require('bcrypt')

app.use(express.urlencoded({extended: false}))
app.use(express.json());



app.get('/db', async (req,res)=>{
  var items = await database.listItems("users", {});
  console.log(items)
  
  res.json(items);
})

app.get('/db/addusr', async (req,res)=>{
  function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function getRandomNumberBetween1And99() {
    return Math.floor(Math.random() * (99 - 1 + 1)) + 1;
  }
var usr = {
  name: generateRandomString(10),
  age: getRandomNumberBetween1And99()
};

  var addedItem = await database.addItem("users", usr);
  console.log(addedItem)
  
  res.json(addedItem);
})

//registering
app.post('/register', async (req,res)=>{
  var obj = req.body
  console.log(obj)
  const existingUser = await database.listItems("users", { email: obj.email });
  if (existingUser.length > 0) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  var addedItem = await database.addItem("users", obj);
  res.json(addedItem);
})

//loggingin
app.post('/login', async (req,res)=>{
  var obj = req.body
  console.log(obj)
  if (obj.email == null || obj.password == null || obj.email == "" || obj.password == ""){
    res.json("fail");
  }

  var foundItems = await database.listItems("users", {email: obj.email, password: obj.password});
  console.log(foundItems);
  if (foundItems.length > 0) {
    var o ={status:"success"}
    res.status(200).json(o);
  } else {

    var o ={status:"fail"}
    res.json(o);
  }
})

app.listen(port,() =>{
  console.log(`Server started at http://localhost:${port}`)
});