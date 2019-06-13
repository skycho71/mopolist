//moudle import
var express = require('express');
var app = express();
var mysql = require('mysql');  //mysql import
var bodyParser = require('body-parser');
var path = require('path');
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

var mainRouter = require('./router/main.js');
//app.use(mainRouter);

app.listen(port, function () {
    console.log("Server Start...");
});

app.get("/", (req, res)=>{
    res.send("<h1> Nice Server Connection </h1>");
});