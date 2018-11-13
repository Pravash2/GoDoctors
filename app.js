var express=require("express");
var app=express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var diagoniseRouter = require('./routes/diagonise');

var path = require('path');

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/diagonise', diagoniseRouter);

app.get("*",(req,res)=>{
    res.render('index');
});
app.post("*",(req,res)=>{
    res.render('indexx');
});


app.listen(process.env.PORT || 8080,process.env.IP,function(){
    console.log("The server has started!");
});