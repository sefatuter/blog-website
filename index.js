import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { Post } from './models/index.js';
import './models/index.js';



const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public')); // ! dont forget this
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
}));


// Middleware to set user and username in locals
app.use((req, res, next) => {
  res.locals.user = req.session.userId;
  res.locals.username = req.session.username;
  next();
});

app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);

app.get('/', async (req, res) => {
  const posts = await Post.findAll();
  res.render('index', { posts });
});


// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

// app.get("/home", (req, res) => {
//   res.render("index.ejs");
// });

// app.get("/new", (req, res) => {
//   res.render("new.ejs");
// });


// app.get("/register", (req, res) => {
//   res.render("register.ejs");
// });

// app.get("/about", (req, res) => {
//   res.render("about.ejs");
// });

// app.get("/login", (req,res) => {
//   res.render("login.ejs");
// });



app.listen(port, () => {
  console.log(`Listening on port ${port} http://127.0.0.1:3000`);
});