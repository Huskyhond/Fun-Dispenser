var PythonShell = require('python-shell');
var pyshell = new PythonShell('Button.py');

pyshell.on('message', function (message) {
    console.log(message);
});
