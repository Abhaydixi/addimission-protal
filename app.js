const express = require('express')
const app = express()
const port = 3300
const web =require('./routes/web')
const connectDB =require("./db/connect_db");
var cloudinary =require('cloudinary')
const fileUpload = require("express-fileupload");
var session = require('express-session')
var flash = require('connect-flash')

//connect db
connectDB()

app.use(express.urlencoded({ extended: false }));


//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//Temp file uploader
app.use(fileUpload({useTempFiles: true}));
// for flash message show
app.use(session({
    secret: 'secret',
    cookie: { maxAge:60000},
    resave: false,
    saveUninitialized: false,
  }));
  
  app.use(flash());

app.set('view engine', 'ejs')
//route localhost:3300  



app.use('/',web)

//static file
app.use(express.static('public'))


//server create
app.listen(port, () => {
    console.log("server star local server:3300");
});