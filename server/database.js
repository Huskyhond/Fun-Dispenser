var dbase 	= require('./dbase.js');

var connection = dbase.getConnection();

var database = {
	/**
		@errorScope: 100-199
	*/

	defaultError: function(error, code, message) {
		if(!code) code = 999;
		if(!message) message = "Unknown error";
		return { 
				code: 1,
				message: message
			} 
	},

	/**
	* Returns object with key items (empty if no rows) or object with key error
	*/

	getAllPlayerDetails: function(options, callback) {
		if(!options) options = {};

		if(typeof options === "function" && !callback) { 
			callback = options;
			options = {};
		}


		var _options = {
			select: "SELECT playerId as id, playerName, tagId, experience, flavour.flavourId as id, flavourName, level.levelId as id, achievedAt, levelName",
			from: "FROM players as player INNER JOIN flavours as flavour ON flavour.flavourId = player.flavourId INNER JOIN levels as level ON level.levelId = player.levelId",
			where: options.where,
			nestTables: true
		};

		dbase.genericSqlQuery(_options, callback);
	},
	getAllFlavourDetails: function(options, callback) {
		if(!options) options = {};

		if(typeof options === "function" && !callback) { 
			callback = options;
			options = {};
		}


		var _options = {
			select: "SELECT flavourId as id, flavourName",
			from: "FROM flavours as flavour",
			where: options.where,
			nestTables: true
		};

		dbase.genericSqlQuery(_options, callback);
	},

	/**
	* Get player details: includes flavour & level
	*/
	getPlayerDetailsById: function(playerId, callback) {
		database.getAllPlayerDetails({ where: { "player.playerId": playerId } }, callback);
	},
	getPlayerDetailsByTagId: function(tagId, callback) {
		database.getAllPlayerDetails({ where: { "player.tagId"	 : tagId 	  } }, callback);
	},
	getPlayerDetailsByLevelId: function(levelId, callback) {
		database.getAllPlayerDetails({ where: { "level.levelId"	 : levelId  } }, callback);
	},
	getPlayerDetailsByFlavourId: function(flavourId, callback) {
		database.getAllPlayerDetails({ where: { "player.flavourId" : flavourId } }, callback);
	},
	/** End player details block  **/


	/**
	* Get flavour details, only Id applicable yet.
	*/
	getFlavourDetailsById: function(flavourId, callback) {
		database.getAllFlavourDetails({ where: { "flavourId": flavourId}}, callback);
	},

	getQuestions: function(options, callback) {
	  var result = {};
	  result.questions = [];
	  connection.query("SELECT questionId, question, answer FROM questions WHERE ? LIMIT " + options.limit, 
	  	{ levelId: options.levelId, subjectId: options.subjectId  })
	  .on('error', function(err) {
	  })
	  .on('fields', function(fields) {
	    
	  })
	  .on('result', function(row) {
	  	result.questions.push(row);
	  })
	  .on('end', function() {
			callback(result);
	  });
	}
};

module.exports = database;