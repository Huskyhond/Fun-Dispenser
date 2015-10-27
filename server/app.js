"use strict";

var restify = require('restify'),
		api			= require('./api.js'),
		config  = require('./config.js');

var server = restify.createServer({
	name: 'Project Fun Server',
	version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get('/players/:playerId', api.getPlayerDetails);
server.get('/players/tag/:tagId', api.getPlayerDetails);
server.get('/players/level/:levelId', api.getPlayerDetails);

server.listen(config.port, function() {
	console.log("Server started!");
});