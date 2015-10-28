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
		var where = "";
		if(!options.result) options.result = {};
		if(!options.result.items) options.result.items = [];
		if(options.where)
			where = " WHERE ?";
		console.log("WHERE!!!?", options.where);
		var todo = 0;

		connection.query({
			sql: "SELECT questionId as id, question, answerId, subject.subjectId as id, subject.subjectName" +
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
				}
			});
		});
	}
};

module.exports = database;