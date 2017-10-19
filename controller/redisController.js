var config = require('config');
var dbConfig = config.get('Customer.redisConf');

var redis = require('redis');
var redisClient = redis.createClient(dbConfig);

//Connect to redis db
redisClient.on('connect', function() {
  console.log('connected');
});

//Read data from redis
function readFromCache(req, res, next) {
    console.log(req.url);
    redisClient.get(req.url, function (err, data) {
        if (err) return res.status(500).send({message: error.message});
    
        if (data != null) {
            res.send(data);
        } else {
            next();
        }
    });
  }

  //write data into redis
  function writeToCache(data, req, res, next){
    redisClient.set(req.url,data,function(error,result){
        if (error) return res.status(500).send({message: error.message});
        res.status(200).send(result);
    });
  }

  module.exports = {
    readFromCache : readFromCache,
    writeToCache: writeToCache
    
};