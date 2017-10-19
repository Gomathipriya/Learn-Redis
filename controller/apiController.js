var request = require('request');
var redisController = require("./redisController");

var config = require('config');
var apiConfig = config.get('Customer.apiConfig');

//to fetch data from a dummy api
function fetchDataFromAPI(req,res,next){
    //api call to fetch the data
    request(apiConfig.url+'/comments/'+req.params.id,function(error,response){
        if (error) return res.status(500).send({message: error.message});
        //to write data into redis database
        redisController.writeToCache(response.body,req,res,next);
    });
  };

function getTemplate(req,res,next){
   //TODO
};

function getHeroBanner(req,res,next){
    request(apiConfig.url+'/heroBanner/',function(error,response){
        if (error) return res.status(500).send({message: error.message});
        redisController.writeToCache(req,response,next);
    });
};

function getMenuDetails(req,res,next){
    //TODO
};

function getIconLayout(req,res,next){
    request(apiConfig.url+'/iconLayout/',function(error,response){
        if (error) return res.status(500).send({message: error.message});
        redisController.writeToCache(req,response,next);
    });
};

function getStarRating(req,res,next){
    request(apiConfig.url+'/star-rating/',function(error,response){
        if (error) return res.status(500).send({message: error.message});
        redisController.writeToCache(req,response,next);
    });
};

function getLogo(req,res,next){
    request(apiConfig.url+'/logo/',function(error,response){
        if (error) return res.status(500).send({message: error.message});
        redisController.writeToCache(req,response,next);
    });
};

function getFooterBanner(req,res,next){
    request(apiConfig.url+'/footerBanner/',function(error,response){
        if (error) return res.status(500).send({message: error.message});
        redisController.writeToCache(req,response,next);
    });
};

function getCallout(req,res,next){
    request(apiConfig.url+'/callout/',function(error,response){
        if (error) return res.status(500).send({message: error.message});
        redisController.writeToCache(req,response,next);
    });
};
  
  module.exports = {
      fetchDataFromAPI : fetchDataFromAPI,
      getTemplate : getTemplate,
      getHeroBanner: getHeroBanner,
      getMenuDetails : getMenuDetails,
      getIconLayout : getIconLayout,
      getStarRating : getStarRating,
      getLogo : getLogo,
      getFooterBanner : getFooterBanner,
      getCallout : getCallout
  }