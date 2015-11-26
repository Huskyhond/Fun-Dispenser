 $(document).ready(function() {
      alert("new");
      $("#register").submit(function(event) {
          if($("#username").val().length > 0 && $("#email").val().length > 0)
              alert("Sending data to " + settings.apiUrl);
              $.ajax({ type: "POST", 
                       url: settings.apiUrl + "/players",
                       dataType: "json",
                       cache: false, 
                       data: {
                          register: true,
                          username: $("#username").val(),
                          email: $("#email").val()
                       }
              }).done(function(data) {
                if(!data.error) {
                  location.href  = "write.html?id=" + data.player.tagId;
                }

              }).fail(function(data) {
                alert("Fout tijdens aanmelden!" + JSON.stringify(data));
              });
          event.preventDefault();
      });
});
