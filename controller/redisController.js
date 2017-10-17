var config = require('config');
var dbConfig = config.get('Customer.redisConf');

var redis = require('redis');
var redisClient = redis.createClient(dbConfig);

redisClient.on('connect', function() {
  console.log('connected');
});

function readFromCache(req, res, next) {
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

  function writeToCache(req, res, next){
      console.log("write to db");
      redisClient.hmset(req.url,JSON.parse(res.body),function(error,result){
        console.log(result);
      });
  }

  module.exports = {
    readFromCache : readFromCache,
    writeToCache: writeToCache
    
};