 if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
 }

//const db = require("./database.js");
var cors = require('cors');
const express = require("express")
const app = express();
app.use(cors());
const expressLayouts = require('express-ejs-layouts')

app.set("view engine", "ejs")
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
const emailService = require("./emailService");
const DatabaseController = require('./database');
const changePassword = require('./changePassword')
const bcrypt = require('bcrypt')

app.use(express.urlencoded({extended: false}))
app.use(express.json());



app.get('/db', async (req,res)=>{
  var items = await database.listItems("users", {});
  console.log(items)
  
  res.json(items);
})

//registering
app.post('/register', async (req,res)=>{
  var obj = req.body
  console.log(obj)
  
  const existingUser = await database.listItems("users", { email: obj.email });
  if (existingUser.length > 0) {
    // 406 http code Not Acceptable
    res.status(406).json({ error: 'Email already in use' });
    return;
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

//forgotpassword
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await database.listItems("users", { email: email });

    if (existingUser.length > 0) {
      await emailService.sendResetPasswordEmail(email);
      var o ={status:"success"}
      res.status(200).json(o);
    } else {
      var o ={status:"fail"}
      res.json(o);
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
});

//change-pass
app.post('/change-password', async (req, res) => {
    const {email, newPassword, repeatPassword } = req.body;
    if (newPassword !== repeatPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    try {
      // Find user by email
      const user = await DatabaseController.findOne({ email });

      // Check if user exists
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      await changePassword.changePass(email, newPassword)

      return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
      console.error('Error updating password:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }



});

app.listen(port,() =>{
  console.log(`Server started at http://localhost:${port}`)
});