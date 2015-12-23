var request = require('request-json'),
    client  = request.createClient('http://188.166.126.18:8080/');

client.get('players/', function(err, res, body) {
	$(".text-muted").text("Hallo, "+body.error.code+"!");
	console.log(body.error.code);
});
