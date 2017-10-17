var express = require('express');
var router  = express.Router();
var redisController = require("../controller/redisController");
var apiController = require("../controller/apiController");

//API calls
router.get('/comments',redisController.readFromCache,apiController.fetchDataFromAPI);

/* index route */
router.get('/', function(req, res, next) {
  res.render('index');
});
  
/* Otheriwse home page. */
router.get('*', function(req, res, next) {
  res.render('index');
});
  
  module.exports = router;