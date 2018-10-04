var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/",function(req,res){
    res.render("index");
    
});

router.get("/doctors",function(req,res){
    res.render("doctors.ejs");
    
});
router.get("/hospital",function(req,res){
    res.render("hospital.ejs");
    
});

router.get("/bloodbank",function(req,res){
    res.render("bloodbank.ejs");
    
});

router.get("/donate",function(req,res){
    res.render("donate.ejs");
    
});

router.get("/emergency",function(req,res){
    res.render("emergency.ejs");
    
});

router.get("/bloodbank",function(req,res){
    res.render("bloodbank.ejs");
    
});
router.get("/medicine",function(req,res){
    res.render("medicine.ejs");
    
});

module.exports = router;
