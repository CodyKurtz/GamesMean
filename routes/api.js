var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Game = mongoose.model('Game');

router.get('/games', function(req, res, next) {
  Game.find (function(err, games){
	  if(err) {
		  return res.send(500,err);
	  }
	  return res.send(games);
  });
});

router.get('/games/:id', function(req, res, next) {
   Game.findById (req.parms.id, function(err, game){
	  if(err) {
		  return res.send(err);
	  }
	  return res.json(game);
  });
});

router.post('/games', function(req, res, next) {
  var game = new Game();
  game.name = req.body.name;
  game.platform = req.body.platform;
  game.save(function(err, game){
	  if(err) {
		  return res.send(500,err);
	  }
	  return res.json(game);
  });
});

module.exports = router;
