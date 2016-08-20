var mongoose = require ('mongoose');
var GameSchema = new mongoose.Schema({
	name: String,
	platform: String
});

mongoose.model ('Game', GameSchema);