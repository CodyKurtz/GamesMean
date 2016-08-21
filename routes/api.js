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
Game.findOne ({_id: req.params.id}, function(err, game){
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

router.delete('/games/:id', function(req, res, next) {
   Game.remove ({_id: req.params.id}, function(err, game){
	  if(err) {
		  return res.send(err);
	  }
	  res.json({message:'Successfully Deleted'});
  });
});

router.put('/games', function(req, res, next) {
    Game.findById(req.body._id, function (err, game) {
        if (err) {
            return res.send(err);
        }
        game.name = req.body.name;
        game.platform = req.body.platform;
        game.save(function(err){
            if (err) {
                return res.send(err);
            }
            res.json({message:'Game Updated'});
        });
    });
});

/* router.put('/games/:id', function(req, res, next) {
	var newData = "{name: '"+ req.body.name+"' , platform: '"+req.body.platform+"'}";
	console.log(newData);
	Game.findOneAndUpdate({_id: req.params.id},newData, function (err, game) {
	console.log(game);
	if (err) {
		console.log(err);
		return res.send(err);
	}
	game.name = req.body.name;
	game.platform = req.body.platform;
	game.save(function(err){
		if (err) {
		return res.send(err);
	}
	res.json({message:'Game Updated'});
	});
 });
}); */

module.exports = router;
