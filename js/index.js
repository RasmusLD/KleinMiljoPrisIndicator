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
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        /* Unused template code
		var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
		
		//this call starts showing our content and initializes the js code
		//timeout set to allow users to see the splash screen
		setTimeout(function() {
            phonegapReady();
        }, 3000);
    }
};

function phonegapReady() {

$(document).ready(function(){
	
	//creates var body, that will be used on every page.
    var body;
	
	//this must be the first function, so that the JS instantiates properly
    $(function runOnLoad(){
		
		//instantiates all the data variables we'll be using
		//instantiateData();
		
		//we need this for some relative styling on non iPhones...
        //getSize();
        
        //needed to show the  logo on top of all screens
        //showLogo();
		
		//shows the contact information on thje bottom of all screens
		//showContactInfo();
        
        //is used to listen for the "pause" event...
        //document.addEventListener("pause", onPause, false);
        
        //we're listening for iPhone because windows phones have a backBtn but don't support device.platform...
        //omitted because the default event cannot currently be overridden
		//if(!isiPhone) {
            //document.addEventListener("backbutton", onBackKeyDown, false);
        //};
		
		//is used to listen for the "pause" event...
		//omitted because the default event cannot currently be overridden
        //document.addEventListener("pause", onPause, false);
		
		//instantiates var body, that will be used on every page.
		body = $("#bCont");
		
		//starts up the app's functionality
		//OMITTED FOR TESTING, SHOULD BE UPDATED BEFORE RE-ADDING showMiljoIndicatorChoice();
		
		//testAccess();
		testClean();
	});
	
	//test
	function testClean() {
		$(body).empty();
		
		setTimeout(function() {
			$(body).append("<p>testClean success</p>");
			
			//$(body).append(<button action="testAccess" class="btn" >testAccess-Button</button>);
		}, 1);
	};
	
	
	
});
};


