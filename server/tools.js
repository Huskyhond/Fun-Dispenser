var tools = {
	parseUrl: function(str) { // Dank aan: http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
		str = decodeURIComponent(str);
	  var chunks = str.split('&'),
	      obj = {};
	  for(var c=0; c < chunks.length; c++) {
	    var split = chunks[c].split('=', 2);
	    obj[split[0]] = split[1];
	  }
	  return obj;
	}
};

module.exports = tools;