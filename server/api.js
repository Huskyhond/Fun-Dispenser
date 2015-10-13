var database = require("./database");

var api = {
	/*
		@functions: All within this variable
		@params: req, res, next;
		@return: function next();
		@description: Takes the parsed res and request from restify
	*/

	getAccountDetails: function(req, res, next) {
		res.send(req.params);
		return next();
	}
	

};

module.exports = api;
