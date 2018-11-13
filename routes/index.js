const       express = require('express');
            router = express.Router();
            mongoose              = require("mongoose"),
            passport              = require("passport"),
            Campground            = require("../models/campground");
            bodyParser            = require("body-parser"),
            User                  = require("../models/user"),
            LocalStrategy         = require("passport-local"),
            passportLocalMongoose = require("passport-local-mongoose")
            key                   = require('../config/keys')
            mongoose.connect(key.url);
         
            router.use(bodyParser.urlencoded({extended: true}));
            router.use(require("express-session")({
                secret: "Rusty is the best and cutest dog in the world",
                resave: false,
                saveUninitialized: false
            }));
            
            router.use(passport.initialize());
            router.use(passport.session());
            
            passport.use(new LocalStrategy(User.authenticate()));
            passport.serializeUser(User.serializeUser());
            passport.deserializeUser(User.deserializeUser());

/* GET home page. */
router.get("/",function(req,res){
    res.render("index");
    
});

router.get("/doctors",isLoggedIn,function(req,res){
    res.render("doctors.ejs");
    
});
router.get("/hospital",isLoggedIn,function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("hospital",{campgrounds:allCampgrounds});
        }
     });
});


router.get("/bloodbank",isLoggedIn,function(req,res){
    res.render("bloodbank.ejs");
    
});

router.get("/donate",isLoggedIn,function(req,res){
    res.render("donate.ejs");
    
});

router.get("/emergency",function(req,res){
    res.render("emergency.ejs");
    
});

router.get("/bloodbank",isLoggedIn,function(req,res){
    res.render("bloodbank.ejs");
    
});
router.get("/medicine",isLoggedIn,function(req,res){
    res.render("medicine.ejs");
    
});
router.get("/signin",function(req,res){
    res.render("signIn.ejs");
    
});
router.post("/signin", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin"
}) ,function(req, res){
});
router.get("/signup",function(req,res){
    res.render("signUp.ejs");
    
});
router.post("/signup", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('signUp');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/signIn");
        });
    });
});

//CREATE - add new campground to DB
router.post("/hospital/new", isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/hospital");
        }
    });
});

//NEW - show form to create new campground
router.get("/hospital/new", isLoggedIn, function(req, res){
   res.render("newhospital"); 
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signIn");
}

module.exports = router;
