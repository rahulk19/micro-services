var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); 


//printing all the documnets in atlas.
router.get('/',function(req,res){
    var db = req.db;
    var printall = db.get('todolist');
    
});

//process the from
var urlencodedParser = bodyParser.urlencoded({ extended: false });  

router.post('/addtasks',urlencodedParser,function(req,res){

    var db = req.db;
    var collection = db.get('todolist');
    //console.log(collection);
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