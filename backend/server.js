if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//const db = require("./database.js");
var cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected mongoose"));

const port = process.env.PORT || 8000;
const indexRouter = require("./routes/index");
const userRouter = require("./");
const database = require("./database");
const emailService = require("./emailService");
const DatabaseController = require("./database");
const changePassword = require("./changePassword");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/db", async (req, res) => {
  var items = await database.listItems("users", {});
  console.log(items);

  res.json(items);
});

//registering
app.post("/register", async (req, res) => {
  var obj = req.body;
  console.log(obj);

  const existingUser = await database.listItems("users", { email: obj.email });
  if (existingUser.length > 0) {
    // 406 http code Not Acceptable
    res.status(406).json({ error: "Email already in use" });
    return;
  }

  var addedItem = await database.addItem("users", obj);
  res.json(addedItem);
});

//loggingin
app.post("/login", async (req, res) => {
  var obj = req.body;
  console.log(obj);
  if (
    obj.email == null ||
    obj.password == null ||
    obj.email == "" ||
    obj.password == ""
  ) {
    res.json("fail");
  }

  var foundItems = await database.listItems("users", {
    email: obj.email,
    password: obj.password,
  });
  console.log(foundItems);
  if (foundItems.length > 0) {
    let token = btoa(foundItems[0].email);

    var o = { status: "success", token: token };
    res.status(200).json(o);
  } else {
    var o = { status: "fail" };
    res.json(o);
  }
});

// Tylko mam do czynienia z moim niezmienniczonym ciałem,
// Dłonie, które tak dobrze potrafią dotknąć
// Cienkich piersi, a także uroczą twarz,
// Z którą tak dobrze się przyjaźniłem.
// Czuję, jak mój penis zaczyna się rozprężać,
// Więząc się od zamiłowania i oczekiwania.
// Czuję, jak mój brzuch się napięa,
// Roztaczając się, jak kobieta,
// Odpowiadając na każde gest, każde dotknięcie.
// Oczy są tak pełne żądza,
// Dłonie tak delikatne, jak tkawica.
// Włosy tak długie, jak halo,
// Oczy tak jasne, jak gwiazdy.
// Serce tak nieustraszone, jak ptaszek,
// Ciało tak delikatne, jak lód.
// Czuję, jak mój penis zaczyna się rozprężać,
// Tyleż samo, jak mój zamiłowany wymiar.
// Czuję, jak mój brzuch się napięa,
// Tyleż samo, jak mój wymiar.
// Tyleż samo, jak mój wymiar.

//forgotpassword
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await database.listItems("users", { email: email });

    if (existingUser.length > 0) {
      await emailService.sendResetPasswordEmail(email);
      var o = { status: "success" };
      res.status(200).json(o);
    } else {
      var o = { status: "fail" };
      res.json(o);
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//change-pass
app.post("/change-password", async (req, res) => {
  const { email, newPassword, repeatPassword } = req.body;
  if (newPassword !== repeatPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }
  try {
    // Find user by email
    const user = await DatabaseController.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await changePassword.changePass(email, newPassword);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//post Funkcja dodaje nowy wpis do bazy danych.
app.post("/post", async (input, output) => {
  var obj = input.body; // json przesłany w requescie w frontendzie
  // console.log(obj)

  // sprawdzasz czy pola sa puste
  if (
    obj.title == undefined ||
    obj.content == undefined ||
    obj.draft == undefined ||
    obj.archived == undefined
  ) {
    output.json("fail");
    return;
  }

  //ustaw userId na poscie z tokena
  console.log(input.headers);
  obj["userEmail"] = atob(input.headers["Authorization"]);

  // ustawiasz data utworzenia
  obj["createdDate"] = new Date();
  // dodajesz wpis do bazy danych zapisujac go do tablicy posts
  var addedItem = await database.addItem("posts", obj);
  // zwracasz nowy obiekt z bazy danych w formatie json do frontendu
  output.json(addedItem);
});

//list funkcja zwraca wszystkie wpisy z bazy danych w formacie json posortowane wg pola createdDate czyli data utworzenia
app.get("/posts", async (req, res) => {
  var items = await database.wylistujObjekty("posts", {});
  // console.log(items)
  //  sort items by property createdDate
  items = items.sort((a, b) => {
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
app.post("/comment", async (input, output) => {
  var obj = input.body; // json przesłany w requescie w frontendzie
  // console.log(obj);
  if (
    obj.postId == undefined ||
    obj.content == undefined ||
    obj.userId == undefined
  ) {
    output.json("fail");
    return;
  }
  // dodaj komentarz do posta jako attrybut "comments" w obiekcie post
  //pobierz post po attrybucie _id
  var post = await database.findOne("posts", {
    _id: new mongoose.Types.ObjectId(obj.postId),
  });

  if (post["comments"] == undefined) post["comments"] = [];

  delete obj["postId"];
  obj["createdDate"] = new Date();
  post["comments"] = [obj, ...post["comments"]];

  // console.log(post);
  //zaktualizuj post w bazie danych
  var updatedItem = await database.updateItem(
    "posts",
    { _id: new mongoose.Types.ObjectId(obj.postId) },
    { $set: { comments: post["comments"] } }
  );
  output.json(updatedItem);
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Serve static files from the public directory
app.use(express.static('public'));



// Get user profile
app.get('/profile', async (req, res) => {
  try {
    const user = await DatabaseController.findOne("users", { email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      email: user.email,
      name: user.name,
      bio: user.bio,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update user profile
app.put('/profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, bio } = req.body;
    const updateData = { name, bio };
    
    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await DatabaseController.updateItem(
      "users",
      { email: req.user.email },
      { $set: updateData }
    );

    res.json({
      email: updatedUser.email,
      name: updatedUser.name,
      bio: updatedUser.bio,
      profilePicture: updatedUser.profilePicture
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Create a new post with image
app.post("/post", upload.single('image'), async (req, res) => {
  const { title, content, isDraft } = req.body;
  const userEmail = req.user.email;

  const newPost = {
    title,
    content,
    userEmail,
    isDraft: isDraft === 'true',
    isArchived: false,
    createdDate: new Date(),
    image: req.file ? `/uploads/${req.file.filename}` : null
  };

  try {
    const addedItem = await DatabaseController.addItem("posts", newPost);
    res.json(addedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Like a post
app.post("/post/:id/like",  async (req, res) => {
  const { id } = req.params;
  const userEmail = req.user.email;

  try {
    const post = await DatabaseController.findOne("posts", { _id: new mongoose.Types.ObjectId(id) });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes = post.likes || [];
    const userLikeIndex = post.likes.indexOf(userEmail);

    if (userLikeIndex === -1) {
      post.likes.push(userEmail);
    } else {
      post.likes.splice(userLikeIndex, 1);
    }

    const updatedPost = await DatabaseController.updateItem(
      "posts",
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { likes: post.likes } }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update like" });
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
