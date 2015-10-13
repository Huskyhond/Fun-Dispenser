var mysql = require("mysql");

var connection = mysql.createConnection({

});

var database = {

	getPlayerDetails: function(playerId, callback) {
	  connection.query("SELECT * FROM players WHERE ?", { id: playerId })
	  .on('error', function(err) {
    	
	  })
	  .on('fields', function(fields) {
	    
	  })
	  .on('result', function(row) {
	   
	  })
	  .on('end', function() {

	  });
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