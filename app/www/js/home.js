$(document).ready(function() {
  $.ajax({ type: "GET", 
           url: settings.apiUrl + "/players/tag/" + localStorage.getItem("tagId"),
           dataType: "json",
           cache: false
  }).done(function(playerData) {
    if(!data.error) {
      // api call success
      setDashboard(playerData);
      $.ajax({ type: "GET", 
               url: settings.apiUrl + "/levels/",
               dataType: "json",
               cache: false
      }).done(function(levelData) {
        if(!data.error) {
          // api call success
          setExperience(playerData, levelData);
        }

      }).fail(function(data) {
        alert("Fout tijdens ophalen persoonsgegevens!" + JSON.stringify(data)); 
      });
    }

  }).fail(function(data) {
    alert("Fout tijdens ophalen persoonsgegevens!" + JSON.stringify(data)); 
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
  var user = data.items[0];
  for(var i = 0; i < levelData.items.length; i++) {
    if(levelData.items.levelId == user.level.levelId) {
      if(i < levelData.items.length) {
        var nextLevel = levelData.items[i+1];
        // Iets met level vergelijken
        $("#content .experience").html(user.player.experience);
      }
    }
  }
  $("#loading").css("display", "none");
  $("#content").css("display", "block");

  
}