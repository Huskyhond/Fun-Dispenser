var database = require("./database");

var api = {
	/*
		@functions: All within this variable
		@params: req, res, next;
		@return: function next();
		@description: Takes the parsed res and request from restify
	*/

	getPlayerDetails: function(req, res, next) {
		res.send(req.params);
		return next();
	},
	
	getQuestion: function(req, res, next) {
		database.getQuestions({ levelId: 1, subjectId: 3, limit: 1 }, function(result) {
			
		});
	}
	

};

module.exports = api;
