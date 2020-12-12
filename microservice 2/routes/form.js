var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/',function(req,res){
    res.render('addtasks');
})

//we are goin gto process the form that is coming from another microservice.
var urlencoderParser = bodyParser.urlencoded({extended:false});

router.post('/updatelist',urlencoderParser,function(req,res){

    var db = req.db;
    var collection = db.get('todolist');
    collection.insert({
        "task" : req.body.task
    },function (err, doc) {
        if (err) {
            // If it failed, return error

            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.json({"message":"success"});
        }
    });
});

module.exports = router;






