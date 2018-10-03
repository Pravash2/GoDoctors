var express = require('express');
var router = express.Router();
var keys=require("../config/keys");
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('diagonise');
});
router.get('/id/:Id', function(req, res, next) {
    var result=req.params.Id;
    var token=keys.DummyToken;
    var Url="https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=["+result+"]&gender=male&year_of_birth=1999&token="+token+"&format=json&language=en-gb";
            request(Url,(error,response,body)=>{
            if(!error && response.statusCode==200){
                var data=JSON.parse(body);
                res.render('result',{data:data});
                }
              })
        
});


module.exports = router;
