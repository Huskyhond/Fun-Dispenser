// You have to make the TAG write in javascript! good luck

function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}

if(!gup('id', window.location.href))
	return window.location.href = "index.html";

nfc.addNdefListener (
    function (nfcEvent) {
        var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;

        var write = {
        	id: gup('id', window.location.href)
        }

        nfc.write({
        	ndef.textRecord(write);

        }, function() {
        	// success
        	window.localStorage.setItem("tagId", write.id);
        	window.localStorage.setItem("loggedIn", true);
        	window.location.href = "home.html";
        }, function() {
        	// fail
        	alert("Fout tijdens schrijven mok, probeer het opnieuw!");
        	window.location.reload();
        });
        
    },
    function () { // success callback
        
    },
    function (error) { // error callback
        alert("Error adding NDEF listener " + JSON.stringify(error));
    }
);