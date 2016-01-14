"use strict";

var restify = require('restify'),
		api			= require('./api.js'),
		config  = require('./config/config.js');

/* Ripped from: http://stackoverflow.com/questions/10995601/node-restify-how-to-indent-json-output */
function customFormat(req, res, body) {
  if (!body) {
    if (res.getHeader('Content-Length') === undefined &&
        res.contentLength === undefined) {
      res.setHeader('Content-Length', 0);
    }
    return null;
  }

  if (body instanceof Error) {
    // snoop for RestError or HttpError, but don't rely on instanceof
    if ((body.restCode || body.httpCode) && body.body) {
      body = body.body;
    } else {
      body = {
        message: body.message
      };
    }
  }

  if (Buffer.isBuffer(body))
    body = body.toString('base64');

  var data = JSON.stringify(body, null, 2);

  if (res.getHeader('Content-Length') === undefined &&
      res.contentLength === undefined) {
    res.setHeader('Content-Length', Buffer.byteLength(data));
  }

  return data;
}

var server = restify.createServer({
	name: 'Project Fun Server',
	version: '0.0.1',
	formatters: {
		'application/json' : customFormat
	}
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


/** players */
server.post('/players', api.setPlayer);
server.post('/players/flavour', api.setPlayerFlavour);

server.get('/players', api.getPlayerDetails);
server.get('/players/:playerId', api.getPlayerDetails);
server.get('/players/tag/:tagId', api.getPlayerDetails);
server.get('/players/level/:levelId', api.getPlayerDetails);
server.get('/players/flavour/:flavourId', api.getPlayerDetails);

/** flavours */
server.get('/flavours', api.getFlavourDetails);
server.get('/flavours/:flavourId', api.getFlavourDetails);

/** questions */
server.post('/question/answer', api.postAnswer); // Optional for answer logging

server.get('/question', api.getRandomQuestion); // get random question of any subject
server.get('/question/subject/:subjectId', api.getRandomQuestion); //get random question of given subject
server.get('/question/:questionId', api.getQuestion); // get question based on id

/** levels */
server.get('/levels', api.getLevelDetails);
server.get('/levels/:levelId', api.getLevelDetails);

server.listen(config.port, function() {
	console.log("Server started!");
});
