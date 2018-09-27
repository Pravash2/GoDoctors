var express=require("express");
var app=express();

var path = require('path');

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.render("index");
    
});

app.get("/find",function(req,res){
    res.render("doctors.ejs");
    
});

app.get("/blog",function(req,res){
    res.render("blog.ejs");
    
});

app.get("/about",function(req,res){
    res.render("about.ejs");
    
});

app.get("/contact",function(req,res){
    res.render("contact.ejs");
    
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The server has started!");
});