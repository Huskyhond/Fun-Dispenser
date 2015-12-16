var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
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

        nfc.addNdefListener(
            function (nfcEvent) {
                var tag         = nfcEvent.tag;
                var ndefMessage = tag.ndefMessage;

                var write = { id: id };

                var jsonConverted = JSON.stringify(write);

                nfc.write([
                    ndef.textRecord(jsonConverted)
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
                alert("KLAAR OM TE SCANEEEEEN");  
            },
            function (error) { // error callback
                alert("Error adding NDEF listener " + JSON.stringify(error));
            }
        );
    }
};

app.initialize();