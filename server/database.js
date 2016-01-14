var dbase 	= require('./dbase.js'),
		projectDefaults = require("./projectDefaults.js");

var database = {
	/**
		@errorScope: 100-199
	*/

	defaultError: function(code, message) {
		console.log(code, message);
		if(!code) code = 999;
		if(!message) message = "Unknown error";
		return { 
				code: code,
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
	getAllLevelDetails: function(options, callback) {
		if(!options) options = {};

		if(typeof options === "function" && !callback) { 
			callback = options;
			options = {};
		}


		var _options = {
			select: "SELECT levelId as id, levelName, achievedAt",
			from: "FROM levels as level",
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

	/**
	* Get level details, only Id applicable yet.
	*/
	getLevelDetailsById: function(levelId, callback) {
		database.getAllLevelDetails({ where: { "levelId": levelId}}, callback);
	},

	/** 
	*	Get question
	*/
	getQuestion: function(questionId, callback) {
		database.getQuestions({ where: { questionId: questionId }, limit: 1 }, callback);
	},

	getQuestionBySubject: function(subjectId, callback) {
		database.getQuestions({ where: { "subject.subjectId": subjectId }, limit: 1 }, callback);
	},

	getQuestions: function(options, callback) {

		var connection = dbase.getConnection();

		var where = "";
		if(!options.result) options.result = {};
		if(!options.result.items) options.result.items = [];
		if(options.where)
			where = " WHERE ?";

		var todo = 0;
		var cbed = false;

		connection.query({
			sql: "SELECT questionId as id, question.answerId, question, subject.subjectId as id, subject.subjectName" +
					 " FROM questions as question INNER JOIN subjects as subject ON question.subjectId = subject.subjectId" +
					 where + " ORDER BY RAND() " + (options.limit ? "LIMIT " + options.limit : ""),
			nestTables: true
		}, options.where)
		.on('result', function(row) {
			todo++;
			row.answers = [];

			connection.query("SELECT answerId, answer FROM answers WHERE ?", { questionId: row.question.id })
			.on('result', function(_row) {
				row.answers.push(_row);
			})
			.on('end', function() {
				todo--;
				options.result.items.push(row);
				if(todo < 1) {
					callback(options.result);
					cbed = true;
				}
				connection.end();
			});
		})
		.on('end', function() {
			if(!cbed && todo < 1)
				callback(options.result);
				connection.end();
		})
	},

	setPlayer: function(options, callback) {
		
		var connection = dbase.getConnection();

		if(!options.result) options.result = {};
		
		/** Required **/
		if(!options.player || !options.player.playerName) {
			options.result = database.defaultError(101, "Variable 'username' not set, in object 'player'");
			return callback(options.result);
		}

		/** Optional **/
		console.log(options.player);
		console.log("-----");
		var player = projectDefaults.getPlayerDefaults(options.player);
		console.log(player);
		connection.query("INSERT INTO players SET ?", player, function(err, result) {
			if(err) { 
				console.log(err);
				options.result = database.defaultError(100, "Error in database!");
				return callback(options.result)
			}
			options.result.playersInserted = result.affectedRows;
			options.result.player = player;
			options.result.player.playerId = result.insertId;
			callback(options.result);
		});
		connection.end();
	},

	changePlayer: function(options, callback) {
		
		var connection = dbase.getConnection();

		if(!options.result) options.result = {};

		if(!options.player || !options.player.id) {
			options.result = database.defaultError(101, "Variable 'username' not set, in object 'player'");
			return callback(options.result);
		}

		connection.query("UPDATE players SET ? WHERE playerId= " + options.player.playerId, options.player, function(err, result) {
			if(err) { 
				console.log(err);
				options.result = database.defaultError(100, "Error in database!");
				return callback(options.result)
			}
			else {
				options.result.success = true;
				callback(options.result);
			}
		});

		connection.end();

	},

	setPlayerFlavour: function(options, callback) {
		
		var connection = dbase.getConnection();

		if(!options.result) options.result = {};

		if(!options.player || !options.player.playerId) {
			options.result = database.defaultError(102, "Variable 'playerId' not set, in object 'player'");
			return callback(options.result);
		}
		if(!options.flavour || !options.flavour.flavourId) {
			options.result = database.defaultError(103, "Variable 'flavourId' not set in object 'flavour'.");
			return callback(options.result);
		}

		connection.query("UPDATE players SET ? WHERE playerId = " + options.player.playerId, options.flavour, function(err, result) {
			if(err) { 
				console.log(err);
				options.result = database.defaultError(100, "Error in database!");
				return callback(options.result);
			}
			else {
				options.result.success = true;
				return callback(options.result);
			}
		});

		connection.end();

	},

	setAnswer: function(options, callback) {

		var connection = dbase.getConnection();

		if(!options.result) options.result = {};

		if(!options.question || !options.question.questionId) {
			options.result = database.defaultError(102, "Variable 'questionId' not set, in object 'question'");
			return callback(options.result);
		}
		if(!options.answer || !options.answer.answerId)  {
			options.result = database.defaultError(102, "Variable 'answerId' not set, in object 'answer'");
			return callback(options.result);
		}
		if(!options.player || !options.player.playerId) {
			options.result = database.defaultError(102, "Variable 'playerId' not set, in object 'player'");
			return callback(options.result);
		}

	}

};

module.exports = database;
