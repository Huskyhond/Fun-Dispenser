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

  $("#new").attr("href", "new.html?id=" + splitIsSign[1]);
});