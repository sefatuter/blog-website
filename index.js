import express from "express";
import bodyParser from "body-parser";
import methodOverride from 'method-override';
import path from 'path';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(express.static('public')); // ! dont forget this
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/home", (req, res) => {
  res.render("index.ejs");
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});


app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/login", (req,res) => {
  res.render("login.ejs");
});



app.listen(port, () => {
  console.log(`Listening on port ${port} http://127.0.0.1:3000`);
});