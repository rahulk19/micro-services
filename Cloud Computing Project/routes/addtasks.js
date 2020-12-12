var express = require('express');
var router = express.Router();
var APIURL = 'http://localhost:3001/form';
var request = require('request');

/* GET home page. */

router.get('/form', function(req, res, next){
 request(APIURL  ,

       function (error, response, body) {

           if (!error && response.statusCode == 200) {


               res.send(body);

           } else {

               console.log(response.statusCode + response.body);

               res.send({info: NULL});

           }

       });
});

module.exports = router;