var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 8000
var io = require('socket.io')(server);
var fs = require('fs');
var PythonShell = require('python-shell'),
    Read2Pyshell = new PythonShell('/RFID/Read2.py'),
    ButtonPyshell = new PythonShell('Button.py');
var request = require('request-json');
var client = request.createClient('http://188.226.212.161');
var read;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/home/pi/Test GUI/public/css'));
app.use(express.static(__dirname + '/home/pi/Test GUI/public/js'));
app.use(express.static(__dirname + '/home/pi/Test GUI/public/img'));
// Create a sample login page @ http://localhost:8000
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


server.listen(port); // Setup your server port.


var globalUser;

io.sockets.on('connection', function(socket){
  //send data to client
  var called = 0;
  var answer;
  var user;

  setInterval(function(){
  	if(read){
  		if(read.tagId == 'None'){
  			if(called == 1){
  				socket.emit('disconnectUser');
  			}
  			called = 0;
  		}
  		else if(!called){
		  	client.get('/players/tag/'+read.tagId, function(err, res, body){
		  		if(typeof body.error != 'undefined'){
		  			console.log('Unknown Player');
		  			socket.emit('unknownPlayer');
		  		}
		  		else if(typeof body.items[0] != 'undefined' ){
          var testUser = body;

          globalUser = body.items[0];
					user = globalUser.player;
		  			var player = globalUser.player;
            
		  			socket.emit('player', testUser);

		  			client.get('/question',function(err, res, body){
		  				var question = body.items[0];
		  				answer = question;
		  				socket.emit('question', question);
		  			});
		  		}
		  	});
		  	called = 1;
  		}
  	}
  }, 10);

  //recieve client data
  socket.on('client_data', function(data){
    console.log(data);
  });

  socket.on('giveDrink', function(){
  	console.log('DRINKEN DISPENSEN');
    var pin = 36;
    
    switch(globalUser.flavour.id) {
      case 1:
        pin = 36;
        break;
      case 2:
        pin = 38;
        break;
      case 3:
        pin = 40;
        break;
    }

    //Relais    
    var time = 5500;
    
    PythonShell.run('relais.py', {
      args: [pin, time]
    }, function(err, results) {
      if(err) throw err;
      console.log('results: %j', results);
    });
  });

  socket.on('disconnectUser', function(){
  	socket.emit('disconnectUser');
  });

  socket.on('getQuestion', function(){
  	client.get('/question',function(err, res, body){
      console.log(body);
      if(typeof body != 'undefined'){
        var question = body.items[0];
        answer = question;
        socket.emit('question', question);
      }
      else{
        console.log('kan geen vraag vinde');
      }
	  });
  });

  socket.on('answerCheck', function(answerId){
    var postData = {
      answerId: answerId,
      questionId: answer.question.id,
      playerId: user.id,
    };

    var expData ={
      playerId: globalUser.player.playerId,
      experience: globalUser.player.experience + 10,
    };

    if(answerId == answer.question.answerId){
      //var answerId = data;

    	console.log('ANTWOORD IS GOED');     
    	socket.emit('answerCorrect');

      client.post('/players', null, function(error, response, parsed){
      }).form(expData);
      console.log(postData);
      
     
    }
    else if(answerId != answer.question.answerId){
    	console.log('ANTWOORD IS FOUT');
    	socket.emit('answerIncorrect'); 
    }

    client.post('/question/answer', null, function(error  , response, parsed) {
    }).form(postData); 
  });   

});




console.log("App successfully launched!");

      
ButtonPyshell.on('message',function(message){

	    if(message.indexOf('1')>-1){
	      console.log('BUTTON A');
	      io.sockets.emit('buttonA');
	  
	    }
	    else if(message.indexOf('2')>-1){
		  console.log('BUTTON B');  
	      io.sockets.emit('buttonB');
	   
	    }
	    else if(message.indexOf('3')>-1){
	      console.log('BUTTON C');
	      io.sockets.emit('buttonC');
	   
	    }
	    else if(message.indexOf('4')>-1){
	      console.log('BUTTON CANCEL');
	      io.sockets.emit('disconnectUser');
 	    }
		//console.log(data.toString());
	
});

//Read from Read2.py
Read2Pyshell.on('message', function(message){
  read = JSON.parse(message.toString());
/*      if(read.tagId == 'None'){
        if(called == 1){
          socket.emit('disconnectUser');
        }
        called = 0;
      }
      else if(!called){
        client.get('/players/tag/'+read.tagId, function(err, res, body){
          if(typeof body.error != 'undefined'){
            console.log('Unknown Player');
            socket.emit('unknownPlayer');
          }
          else if(typeof body.items[0] != 'undefined' ){
            var player = body.items[0].player;
            socket.emit('player', player);

            client.get('/question',function(err, res, body){
              var question = body.items[0];

              answerId = question.question.answerId;
              socket.emit('question', question);
            });
          }
        });  
        called = 1;
    }*/
    //console.log(read);
});

