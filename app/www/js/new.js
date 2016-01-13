 $(document).ready(function() {
      var split = window.location.href.split("?");
        
      if(split.length < 1) {
          return window.location.href = "index.html";
      }

      var splitIsSign = split[1].split("=");

      if(splitIsSign.length < 1) {
          return window.location.href = "index.html";
      }

      if(splitIsSign[0] != "id") {
          return window.location.href = "index.html";
      }

      var id = splitIsSign = splitIsSign[1];
      
      $("#register").submit(function(event) {
          if($("#username").val().length > 0 && $("#email").val().length > 0)
              $.ajax({ type: "POST", 
                       url: settings.apiUrl + "/players",
                       dataType: "json",
                       cache: false, 
                       data: {
                          register: true,
                          id:       id,
                          username: $("#username").val(),
                          email:    $("#email").val()
                       }
              }).done(function(data) {
                if(!data.error) {
                  window.localStorage.setItem("tagId", id);
                  window.localStorage.setItem("loggedIn", true);
                  window.location.href = "home.html";
                }

              }).fail(function(data) {
                alert("Fout tijdens aanmelden!" + JSON.stringify(data));
              });
          event.preventDefault();
      });
});
