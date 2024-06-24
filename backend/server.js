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


//post Funkcja dodaje nowy wpis do bazy danych.
app.post('/post', async (input, output) => {
  
    var obj = input.body // json przesłany w requescie w frontendzie
    // console.log(obj) 
    
    // sprawdzasz czy pola sa puste
    if (obj.title == undefined || obj.content == undefined || obj.draft == undefined || obj.archived == undefined){
      output.json("fail");
      return;
    }

    // ustawiasz data utworzenia
    obj['createdDate'] = new Date();
    // dodajesz wpis do bazy danych zapisujac go do tablicy posts
    var addedItem = await database.addItem("posts", obj);
    // zwracasz nowy obiekt z bazy danych w formatie json do frontendu
    output.json(addedItem);
});

//list funkcja zwraca wszystkie wpisy z bazy danych w formacie json posortowane wg pola createdDate czyli data utworzenia
 app.get('/posts', async (req,res)=>{
   var items = await database.wylistujObjekty("posts", {});
   // console.log(items)
    //  sort items by property createdDate
   items = items.sort((a,b) => {
    if (a.createdDate > b.createdDate) {
      return -1; 
    } else if (a.createdDate < b.createdDate) {
      return 1; 
    } else {
      return 0; 
    }
   });
   console.log(items);


   res.json(items);
});


// app.put('/post', async (input, output) => {
//   var obj = input.body // json przesłany w requescie w frontendzie
//   console.log(obj) 
//   var updatedItem = await database.updateItem(DbConstants.PostsTable, obj);
//   output.json(updatedItem);
// });

// dodaj komentarz do posta jako attrybut "comments" w obiekcie post
app.post('/comment', async (input, output) => {
  var obj = input.body // json przesłany w requescie w frontendzie
  console.log(obj);
  if (obj.postId == undefined || obj.content == undefined || obj.userId == undefined){
    output.json("fail");
    return;
  }
  // dodaj komentarz do posta jako attrybut "comments" w obiekcie post
  //pobierz post po attrybucie _id
  var post = await database.findOne("posts", {_id: new mongoose.Types.ObjectId(obj.postId)});

  if (post["comments"] == undefined)
    post["comments"] = [];    
  
  delete obj["postId"];
  obj['createdDate'] = new Date();
  post["comments"] = [obj, ...post["comments"]];

  console.log(post);
  //zaktualizuj post w bazie danych
  var updatedItem = await database.updateItem("posts",{_id: new mongoose.Types.ObjectId(obj.postId)}, { $set: { comments: post["comments"] } });
  output.json(updatedItem);
});

// Upload spending data 
app.post('/spendingData', async (req, res) => {

    var obj = input.body; 
    if (
      obj.amount == undefined ||
      obj.category == undefined ||
      obj.date == undefined
    ) {
      output.json("fail");
      return;
    }
  
    console.log(input.headers);
    obj["userEmail"] = atob(input.headers["Authorization"]);
    
    var addedItem = await database.addItem("spendingData", obj);
    output.json(addedItem);
});
app.get("/spendingData", async (req, res) => {
  var items = await database.wylistujObjekty("spendingData", {});
  console.log(items);
  res.json(items);
});

app.listen(port,() =>{
  console.log(`Server started at http://localhost:${port}`)
});