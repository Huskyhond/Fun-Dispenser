var config  = require('./config/config.js');
var mysql = require("mysql");


var dbase = {

	options: null,
	
	getConnection: function() {
		return mysql.createConnection(config.database);
	},

	/**
		options.queryOptions = {
			nestTables: true,
			
			where:
		}
	*/
	genericSqlQuery: function(options, callback) {
		var connection = dbase.getConnection();
		options = dbase.setDefaultOptions(options, callback); // Set default functions/variables if not set.
		var queryOptions = {};
		queryOptions.sql = options.select + " " + options.from;
		
		if(options.where)
			queryOptions.sql += " WHERE ?";
		if(options.orderBy)
			queryOptions.sql += " ORDER BY " + options.orderBy;
		if(options.limit)
			queryOptions.sql += " LIMIT " + options.limit;
		
		queryOptions.nestTables = !!options.nestTables;

		connection.query(queryOptions, options.where)
		.on('error', options.errorFunction)
		.on('fields', options.fieldsFunction)
		.on('result', options.resultFunction)
		.on('end', options.endFunction);
		connection.end();
	},

	setDefaultOptions: function(options, callback) {
		var connection = dbase.getConnection();
		if(!options.result) options.result = {};
		if(!options.result.items) options.result.items = [];
		if(!options.errorFunction) { 
			options.errorFunction = function(err) {
				console.log(err);
			}
		}
		if(!options.resultFunction) {
			options.resultFunction = function(row) {
				options.result.items.push(row);
			}
		}
		if(!options.fieldsFunction) {
			options.fieldsFunction = function(fields) {
			}
		}
		if(!options.endFunction) {
			options.endFunction = function() {
				if(callback) callback(options.result);
			}
		}
		return options;
	}
}

module.exports = dbase;