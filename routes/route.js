var request = require('request');
var config = require('../config/config');
var express = require('express');
var router  = express.Router();

var redis = require('redis');
var redisClient = redis.createClient(config.redisConf);

redisClient.on('connect', function() {
  console.log('connected');
});

//API calls
router.get('/posts',cache,getPosts);

function cache(req, res, next) {
  console.log(req.url);
  redisClient.hgetall(req.url, function (err, data) {
      if (err) throw err;
  
      if (data != null) {
          res.send(data);
      } else {
          next();
      }
  });
}

function getPosts(req,res,next){
  request('https://jsonplaceholder.typicode.com/posts/1',function(error,response){
    redisClient.hmset(req.url,JSON.parse(response.body),function(error,result){
      console.log(result);
    });
  });
};

/* index route */
router.get('/', function(req, res, next) {
    res.render('index');
  });
  
  /* Otheriwse home page. */
  router.get('*', function(req, res, next) {
    res.render('index');
  });
  
  module.exports = router;