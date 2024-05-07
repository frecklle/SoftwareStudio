 if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
 }

//const db = require("./database.js");

const express = require("express")
const app = express();
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

app.use('/index', indexRouter)

app.get('/', (req,res) => {
  res.render('index.ejs')
})

app.get("/login", (req, res) => {
  res.render('login.ejs')
})

app.use('/user', userRouter)

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

app.listen(port,() =>{
  console.log(`Server started at http://localhost:${port}`)
});