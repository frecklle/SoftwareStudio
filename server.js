const dbPromise = require("./database.js");

const express = require("express")
const app = express();

dbPromise.then(db => {
    app.get("/", (req, res) => {
        console.log("Here")
        res.status(500).json({message: "Error"})
    })
  });

app.listen(8000);