/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    //Returns false if invalid json string
    parseJSON: function(str) {
        try {
            var o = JSON.parse(str);
            if (o && typeof o === "object" && o !== null)
                return o;
        }
        catch(e) {}
        return false;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        nfc.enabled(function(msg) { // Success
          app.addListener();
        }, // Failure
        function(msg) {
          alert("Please enable NFC!");
          nfc.showSettings();
        });
    },

    addListener: function() {
       nfc.addNdefListener (
            function (nfcEvent) {
                var tag = nfcEvent.tag,
                    ndefMessage = tag.ndefMessage;
					for(i=0;i<tag.id.length;i++)
						if(tag.id[i]<0)
							tag.id[i]+=256;

                // dump the raw json of the message
                // note: real code will need to decode
                // the payload from each record



                // assuming the first record in the message has
                // a payload that can be converted to a string.
                alert(tag.id);
                var id   = nfc.bytesToHexString(tag.id);
                var json = app.parseJSON(nfc.bytesToString(ndefMessage[0].payload).substring(3));
                
                if(id) {
                    if(json.id) {
                        //DoApiCall To check if id exists
                      $.ajax({ 
                        type: "GET", 
                        url: settings.apiUrl + "/players/tag/" + json.id,
                        dataType: "json",
                        cache: false
                      }).done(function(returnedData) {
                        if(!returnedData || returnedData.error)
                          app.unknownUser();
                        else {
                          window.localStorage.setItem("tagId", json.id);
                          window.localStorage.setItem("loggedIn", true);
                          location.href = "home.html";
                        }
                      }).fail(function(data) {
                        alert("Error, try again later");
                      });
                    }
                }
                else 
                    app.unknownUser();
            },
            function () { // success callback
                app.receivedEvent('scanready');
            },
            function (error) { // error callback
                alert("Error adding NDEF listener " + JSON.stringify(error));
            }
        );
    },

    //Called to update DOM for a new USER.
    unknownUser: function() {
        location.href = "notfound.html";
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
