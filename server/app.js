"use strict";

var restify = require('restify'),
		api			= require('./api.js'),
		config  = require('./config/config.js');

var server = restify.createServer({
	name: 'Project Fun Server',
	version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


/** players */
server.post('/players', api.setPlayer);

server.get('/players', api.getPlayerDetails);
server.get('/players/:playerId', api.getPlayerDetails);
server.get('/players/tag/:tagId', api.getPlayerDetails);
server.get('/players/level/:levelId', api.getPlayerDetails);
server.get('/players/flavour/:flavourId', api.getPlayerDetails);

/** flavours */
server.get('/flavours', api.getFlavourDetails);
server.get('/flavours/:flavourId]', api.getFlavourDetails);

/** questions */
server.get('/question', api.getRandomQuestion); // get random question of any subject
server.get('/question/subject/:subjectId', api.getRandomQuestion); //get random question of given subject
server.get('/question/:questionId', api.getQuestion); // get question based on id

server.listen(config.port, function() {
	console.log("Server started!");
});
