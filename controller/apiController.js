var request = require('request');
var redisController = require("./redisController");

function fetchDataFromAPI(req,res,next){
    request('https://jsonplaceholder.typicode.com/comments',function(error,response){
        redisController.writeToCache(req,response,next);
    });
  };
  
  module.exports = {
      fetchDataFromAPI : fetchDataFromAPI
  }