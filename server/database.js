var mysql = require("mysql");

var connection = mysql.createConnection({

});

var database = {
	getPlayerDetails: function(playerId) {
		connection.query("SELECT * FROM players WHERE ?", { id: playerId })
		.on('error', function(err) {
    	
	  })
	  .on('fields', function(fields) {
	    
	  })
	  .on('result', function(row) {
	    connection.resume();
		});
};

module.exports = database;