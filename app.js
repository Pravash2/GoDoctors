const express=require("express");
const app=express();
const ejs=require("ejs")

app.set("view engine",'ejs')

app.get("/",function(req,res){
    res.render('home')
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
})