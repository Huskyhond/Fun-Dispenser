var config  = require('./config/config.js');
var mysql = require("mysql");


var dbase = {

	connection: ,
	options: null,
	
	getConnection: function() {
		dbase.connection = mysql.createConnection(config.database);
		return dbase.connection;
	},

	/**
		options.queryOptions = {
			nestTables: true,
			
			where:
		}
	*/
	genericSqlQuery: function(options, callback) {
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

		dbase.connection.query(queryOptions, options.where)
		.on('error', options.errorFunction)
		.on('fields', options.fieldsFunction)
		.on('result', options.resultFunction)
		.on('end', options.endFunction);
	},

	setDefaultOptions: function(options, callback) {
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