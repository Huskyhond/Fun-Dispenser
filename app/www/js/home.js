$.afui.useOSThemes = false;
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

  }).fail(function(data) {
    alert("Fout tijdens ophalen persoonsgegevens!" + JSON.stringify(data)); 
  });

  $(window).on("swiperight", function(event) {
    $("#leftpanel").panel("open");
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
