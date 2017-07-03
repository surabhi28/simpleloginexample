var express = require('express');
var router = express.Router();

var fs = require("fs");
var http = require("http");
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next) {
 MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);

     var collection = db.collection("logindata");
       collection.find({'username':req.body.username , 'password' : req.body.password }).toArray(function(err,docs){
       console.log(req.body);
        if(docs.length<1){
          /*res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('../public/login.html').pipe(res);*/
         // res.send('respond with a resource');
         res.end('Back and Enter valid info!!');

        }
        else{  console.log('login success')
                res.writeHead(200, {'Content-Type': 'text/html'});
             fs.createReadStream(__dirname + '/logout.html').pipe(res);
            
            //  res.end('Success');
        }
       db.close()


       });
});

});
router.post('/signup', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    var collection = db.collection("logindata");
    collection.insertOne({'username' : req.body.username , 'password' : req.body.password  , 'email' : req.body.email})
   , function(err,result){
       assert.equal(err,null);
          
              db.close() 
      }
  
//      res.end('data saved successfully!!')
 res.writeHead(200, {'Content-Type': 'text/html'});
         fs.createReadStream(__dirname + '/logout.html').pipe(res);
         console.log('registration username:'+req.body.username+'password:'+req.body.password);
         
   });


});


module.exports = router;
