"use strict";

var restify = require('restify'),
		api			= require('./api.js');

var server = restify.createServer({
	name: 'Project Fun Server',
	version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get('/player/:id', api.getPlayerDetails);


server.listen(80, function() {
	console.log("Server started!");
});