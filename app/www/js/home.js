$.afui.useOSThemes = false;
$.afui.setBackButtonVisibility(false); 

var playerId = 0;

function handleLogs(logs, callback) {
  if(logs.length > 0) {
    var log   = logs.shift();
    $.ajax({ 
      type: "GET", 
      url:  settings.apiUrl + "/question/" + log.answerLog.questionId,
      dataType: "json",
      cache: false
    }).done(function(question) {
      $q = $("<div>").html(question.items[0].question.question);
      if(log.answerLog.answerId == question.items[0].question.answerId)
        $q.addClass("correct");
      else
        $q.addClass("incorrect");
      handleLogs(logs, callback);
      $q.appendTo(".questionlog");
    }).fail(function(data) {
      alert(data);
    });
  }
  else
    if(callback) callback();
}

$(document).ready(function() {

  $("#content").css("display", "none");
  $.ajax({ type: "GET", 
           url: settings.apiUrl + "/players/tag/" + localStorage.getItem("tagId"),
           dataType: "json",
           cache: false
  }).done(function(playerData) {
    if(!playerData.error) {
      // api call success
      setDashboard(playerData);
      playerId = playerData.items[0].player.id;
      $.ajax({ type: "GET", 
               url: settings.apiUrl + "/levels/",
               dataType: "json",
               cache: false
      }).done(function(levelData) {
        if(!levelData.error) {
          // api call success
          setExperience(playerData, levelData);
          $("#content").css("display", "block");
        }

      }).fail(function(data) {
        alert("Fout tijdens ophalen persoonsgegevens!" + JSON.stringify(data)); 
      });
    }

    $.ajax({ 
      type: "GET", 
      url:  settings.apiUrl + "/flavours",
      dataType: "json",
      cache: false
    }).done(function(flavourData) {
      var playerFlavour = playerData.items[0].flavour.id;
      for(i = 0; i < flavourData.items.length; i++) {
        var item   = flavourData.items[i];
        var option = $("<option>").html(item.flavour.flavourName).val(item.flavour.id);
        if(playerFlavour == item.flavour.id)
          option.attr("selected", "selected");
        $(".tastes").append(option);
      }
    });

    $.ajax({ 
      type: "GET", 
      url:  settings.apiUrl + "/question/log/" + playerId,
      dataType: "json",
      cache: false
    }).done(function(logData) {
      var logs = logData.items;
      handleLogs(logs);
    });

  }).fail(function(data) {
    alert("Fout tijdens ophalen persoonsgegevens!" + JSON.stringify(data)); 
  });


  $(".icon").click(function() {
    $.afui.clearHistory();
  });

  $(".tastes").change(function() {
    var newTaste = $(this).find("option:selected").text();
    $.ajax({ 
      type:     "POST",
      url:      settings.apiUrl + "/players/flavour",
      data: {
        flavourId: $(this).val(),
        playerId: playerId
      },
      dataType: "json",
      cache:    false
    }).done(function(rtn) {
      // Actually I don't really care about the reply.
      $("#content .flavourName").html(newTaste);
    }).fail(function(rtn) {
      alert(JSON.stringify(rtn));
    });
  });

  $(".flavourName").click(function() {
    $('.tastes').attr('size',6);
  });
  
});

function setDashboard(data) {
  var user = data.items[0];
  $("#content .playerName").html(user.player.playerName);
  $("#content .flavourName").html(user.flavour.flavourName);
  $("#content .levelName").html(user.level.levelName);

  $("#loading").css("display", "none");
  $("#content").css("display", "block");

}

function setExperience(playerData, levelData) {
  var user = playerData.items[0];
  for(var i = 0; i < levelData.items.length; i++) {
    if(levelData.items[i].level.id == user.level.id) {
      if(i+1 < levelData.items.length) {

        var nextLevel = levelData.items[i+1].level;

        var percent = ((user.player.experience - user.level.achievedAt)/(nextLevel.achievedAt - user.level.achievedAt)) * 100;
        $("#progressbar div").css({ width: percent + "%" });
        $("#progressbar span").html(percent + "%");
        break;
      }
      else {
        $("#progressbar div").css({ width: "100%" });
        $("#progressbar span").html("100%");
      }
    }
  }
  $("#loading").css("display", "none");
  $("#content").css("display", "block");
}
