var database = require("./database"),
		tools		 = require("./tools.js");

var api = {
	/*
		@functions: All within this variable
		@params: req, res, next;
		@return: function next();
		@description: Takes the parsed res and request from restify
		@errorScope: 200-299
	*/

	setPlayer: function(req, res, next) {
		var postData = tools.parseUrl(req.body);

		var callback = function(dbResult) {
			if(dbResult.playersAffected < 1) {
				dbResult.error = {
					code: 202,
					message: "Database refused data given!"
				}
			}
			res.send(dbResult);
		}

		if(postData && postData.register) {
			database.setPlayer({
				player: {
					tagId      : postData.id,
					playerName : postData.username,
					email			 : postData.email
				}
			}, callback);
		}
		else {
			database.changePlayer({
				player: {
					playerId: postData.playerId,
					experience: postData.experience
				}
			}, callback);
		}

		return next();
	},

	setPlayerFlavour: function(req, res, next) {
		var postData = tools.parseUrl(req.body);

		var callback = function(dbResult) {
			res.send(dbResult);
		}

		if(postData && postData.flavourId) {
			database.setPlayerFlavour({ 
				player: {
					playerId: postData.playerId
				},
				flavour: {
					flavourId: postData.flavourId
				} 
			}, callback);
		}
	},

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
		};

		if(req.params.flavourId)
			database.getFlavourDetailsById(req.params.flavourId, callback);
		else
			database.getAllFlavourDetails(callback);
		return next();
	},

	getLevelDetails: function(req, res, next) {
		
		var callback = function(dbResult) {
			res.send(dbResult);
		};

		if(req.params.levelId)
			database.getLevelDetailsById(req.params.levelId, callback);
		else
			database.getAllLevelDetails(callback);
	},

	getRandomQuestion: function(req, res, next) {
		var callback = function(dbResult) {
			res.send(dbResult);
		};

		if(req.params.subjectId)
			database.getQuestionBySubject(req.params.subjectId, callback);
		else
			database.getQuestions({ limit: 1}, callback);

		return next();
	},
	
	getQuestion: function(req, res, next) {
		if(!req.params.questionId)
			return api.getRandomQuestion(req, res, next);

		database.getQuestion(req.params.questionId, function(dbResult) {
			if(dbResult.items.length < 1)
				dbResult.error = { code: 201, message: "Question not found" };
			res.send(dbResult);
		});
		return next();
	}
	

};

module.exports = api;
