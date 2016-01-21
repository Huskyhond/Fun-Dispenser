$.afui.useOSThemes = false;
$.afui.setBackButtonVisibility(false); 

var playerId = 0;

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
      for(i = 0; i < logs.length; i++) {
        var log   = logs[i];
        alert(JSON.stringify(log));
        (function(_log) {
          $.ajax({ 
            type: "GET", 
            url:  settings.apiUrl + "/question/" + _log.answersLog.questionId,
            dataType: "json",
            cache: false
          }).done(function(question) {
            $q = $("<div>").html(question.question.question);
            if(_log.answersLog.answerId == question.items[0].question.id)
              $q.css("background-color", "green");
            else
              $q.css("background-color", "red");
            $q.appendTo(".questionlog");
          });
        })(log);
      }
    });

  }).fail(function(data) {
    alert("Fout tijdens ophalen persoonsgegevens!" + JSON.stringify(data)); 
  });

  

  $(window).on("swiperight", function(event) {
    $("#leftpanel").panel("open");
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
      if(i < levelData.items.length) {

        var nextLevel = levelData.items[i+1].level;
        // Iets met level vergelijken
        //$("#content .experience").html(user.player.experience + "/ " + nextLevel.achievedAt);
        var percent = (user.player.experience/nextLevel.achievedAt) * 100;
        $("#progressbar div").css({ width: percent + "%" });
        $("#progressbar span").html(percent + "%");
        break;
      }
    }
  }
  $("#loading").css("display", "none");
  $("#content").css("display", "block");
}
