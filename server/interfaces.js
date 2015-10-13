/* API.js */
var getQuestion = function(req, res, next) {
    return {
        id: 1,
        question: "",
        subjectId: 1
    };
};



/* Database.js */
var getPlayerDetails = function(tagId) {
    return { 
             player: {
                id: 1, 
                playerName: "", 
                tagId: 1, 
                experience: 1, 
                levelId: 1, 
             },
             flavour: {
                 id: 1,
                 flavourName: ""
             },
             level: {
                 id: this.player.levelId,
                 experience: this.player.experience,
                 levelName: "",
                 achievedAt: 1
             }
    };
}

var getQuestions = function(options, callback) {
    var options = {
        levelId: 1,
        subjectId: 1,
        limit: 1
    }
    
    return  { 
        questions: [{
            id: 1,
            question: "",
            subjectId: options.subjectId,
            answer: ""
        },{
            id: 2,
            question: "",
            subjectId: options.subjectId,
            answer: ""
        }]
    };
}
