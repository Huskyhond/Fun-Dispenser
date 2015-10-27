var mysql = require("mysql");

var connection = mysql.createConnection({
	host 		 : "localhost",
	user 		 : "root",
	password : "root",
	database : "fundispenser_local",
	port		 : 8889
});

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
		
		var result = {};
				result.items = [];

		var sqlStatement = "SELECT playerId as id, playerName, tagId, experience, " +
											 "			 flavour.flavourId as id, flavourName, " +
											 "			 level.levelId as id, achievedAt, levelName " +
		  								 "FROM players as player " +
		  								 "INNER JOIN flavours as flavour " +
		  								 "ON flavour.flavourId = player.flavourId " +
		  								 "INNER JOIN levels as level " +
		  								 "ON level.levelId = player.levelId "
		if(options.where)
			sqlStatement += "WHERE ?";
		console.log(options.where);
		connection.query({ nestTables: true, 
	  									 sql: sqlStatement
		}, options.where)
	  .on('error', function(error) {
	  	result.error = database.defaultError(error, 100, "Mysql Error in getAllPlayerDetails");
	  })
	  .on('fields', function(fields) {
	    
	  })
	  .on('result', function(row) {
	  	var playerObject = {
	  		player: {
	  			id: row.playerId,
	  			playerName: row.playerName
	  		}
	  	}
	  	result.items.push(row);
	  })
	  .on('end', function() {
	  	callback(result);
	  });
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
	/** End player details block  **/


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