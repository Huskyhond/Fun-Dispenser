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
    
    alert(id);
    
    nfc.addNdefListener (
        function (nfcEvent) {
            var tag         = nfcEvent.tag;
            var ndefMessage = tag.ndefMessage;

            var write = {
                id: id
            };

            nfc.write([
                ndef.textRecord(JSON.stringify(write))

            ], function() {
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
    
    
});
