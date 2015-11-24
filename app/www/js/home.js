$(document).ready(function() {
  $.ajax({ type: "GET", 
           url: settings.apiUrl + "/players/tag/" + localStorage.getItem("tagId"),
           dataType: "json",
           cache: false
  }).done(function(data) {
    if(!data.error) {
      // api call success
      alert("ya");
      setDashboard(data);
    }

  }).fail(function(data) {
    alert("Fout tijdens ophalen persoonsgegevens!" + JSON.stringify(data)); 
  });
});

function setDashboard(data) {
  var user = data.items[0];
  $("#content .playerName").html(user.player.playerName);
  $("#content .experience").html(user.player.experience);
  $("#content .flavourName").html(user.flavour.flavourName);
  $("#content .levelName").html(user.level.levelName);

  $("#loading").css("display", "none");
  $("#content").css("display", "block");

}