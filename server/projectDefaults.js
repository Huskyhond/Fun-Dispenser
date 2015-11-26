var crypto = require("crypto");

var projectDefaults = {

	generateGUID: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = crypto.randomBytes(1)[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	},

	getPlayerDefaults: function(optionalPlayerSettings) {
		console.log("im still alive");
		return { 
			playerName: (optionalPlayerSettings.playerName ? optionalPlayerSettings.playerName : "Unknown"),
			tagId: (optionalPlayerSettings.tagId ? optionalPlayerSettings.tagId : projectDefaults.generateGUID()),
			experience: (optionalPlayerSettings.experience ? optionalPlayerSettings.experience : 0),
			levelId: (optionalPlayerSettings.levelId ? optionalPlayerSettings.levelId : 1),
			flavourId: (optionalPlayerSettings.flavourId ? optionalPlayerSettings.flavourId : 1)
		};
	}

};

module.exports = projectDefaults;