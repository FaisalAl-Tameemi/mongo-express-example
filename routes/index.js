var express = require('express');
var router = express.Router();

module.exports = (db) => {

  /* GET home page. */
  router.get('/', function(req, res, next) {
    // get data from DB
    db.collection('logs').find({}).toArray((err, logs) => {
      if(err){
        // respond with status 500 and error info
        return res.send(500, err);
      }
      // otherwise respond with actual data
      res.send(200, logs);
    })
  });

  return router;

};
