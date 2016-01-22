var PythonShell = require('python-shell');
var pyshell = new PythonShell('Read2.py');

//function read(){
	pyshell.on('message',function(message){
		console.log(message);
	});
//}

//setInterval(read,10);
