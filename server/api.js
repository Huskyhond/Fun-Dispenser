var database = require("./database");

var api = {
	/*
		@functions: All within this variable
		@params: req, res, next;
		@return: function next();
		@description: Takes the parsed res and request from restify
		@errorScope: 200-299
	*/

	getPlayerDetails: function(req, res, next) {
		
		var callback = function(dbResult) {
			if(dbResult.items.length < 1) {
				dbResult.error = {
					code: 200,
					message: "Player not found!"
				}
			}
			res.send(dbResult);
		};

		if(req.params.playerId)
			database.getPlayerDetailsById(req.params.playerId, callback);
		else if(req.params.tagId)
			database.getPlayerDetailsByTagId(req.params.tagId.toUpperCase(), callback);
		else if(req.params.levelId)
			database.getPlayerDetailsByLevelId(req.params.levelId, callback);
		else if(req.params.flavourId)
			database.getPlayerDetailsByFlavourId(req.params.flavourId, callback);
		else
			database.getAllPlayerDetails(callback);
			
		return next();
	},

	getFlavourDetails: function(req, res, next) {

		var callback = function(dbResult) {
			if(dbResult.items.length < 1) {
				// do sth if no items found.
			}
			res.send(dbResult);
		}

		if(req.params.flavourId)
			database.getFlavourDetailsById(req.params.flavourId, callback);
		else
			database.getAllFlavourDetails(callback);
		return next();
	},
	
	getQuestion: function(req, res, next) {
		database.getQuestions({ levelId: 1, subjectId: 3, limit: 1 }, function(result) {
			
		});
	}
	

};

module.exports = api;
