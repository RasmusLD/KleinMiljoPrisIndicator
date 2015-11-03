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
    receivedEvent: function(id) {
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
		
		//we need this for some relative styling on non iPhones...
        getSize();
        
        //needed to show the NemVagt logo on top of all screens
        showLogo();
        
        //is used to listen for the "pause" event...
        document.addEventListener("pause", onPause, false);
        
        //we're listening for iPhone because windows phones have a backBtn but don't support device.platform...
        if(!isiPhone) {
            document.addEventListener("backbutton", onBackKeyDown, false);
        };
		
		//is used to listen for the "pause" event...
        document.addEventListener("pause", onPause, false);
		
		//instantiates var body, that will be used on every page.
		body = $("#bCont");
		
		//starts up the app's functionality
		initializeMiljøIndicator();
	});
	
	//closes the app on pause, is used to circumvent our state problem
    function onPause() {
		//closes the app, if people minimize/navigate away from it, also means the app always starts fresh.
        navigator.app.exitApp();
    };
	
	//starts up the indicator, populating it with the starting elements
	function initializeMiljøIndicator() {
		//done to clean the "body"
		$(body).empty();
		
		//timeout is set to circumvent the inherent stack/dom/layer issues of JS
		setTimeout(function() {
			//giving the window a solid green border, that fills the viewport
			$(body).append('<p>before defining windownHeight</p>');
			var windowHeight = $(window).height();
			windowHeight = windowHeight + "px"
			$(body).append('<p>before setting style.height = windownHeight</p>');
			$(body).style.height = "100%";
			$(body).append('<p>before defining border as solid</p>');
			$(body).style.border = "solid";
			
			
			//the var we append to body later on in this method
			var toAppend = '<form id="userProfileForm" class="form-group" role="form" method="post" action="">';
			
			toAppend +='\
				<select name="cars">\
					<option value="indendørs maling">indendørs maling</option>\
					<option value="udendørs maling">udendørs maling</option>\
					<option value="jord">jord</option>\
					<option value="grus">grus</option>\
				</select>\
				\
				<select name="cars">\
					<option value="1">1</option>\
					<option value="2">2</option>\
					<option value="3">3</option>\
					<option value="4">4</option>\
				</select>\
			</form>';
			
			//adds a submit button to the UserProfile form, done outside the "for loop" it will always be at the end of the form
			toAppend += '<button type="submit" class="btn btn-success btn-lg" id="lavUdregning">Lav udregning</button>';
			//closes the UserProfile form, done here outside the "for loop", since we don't know how long the form will be
			toAppend += '</form>';
			
			//appends the data from this method
			$(body).append(toAppend);
			
		}, 1);
		
	};
	
	function showLogo() {
		//inserts the "Klein-Miljø" logo in top of all pages.
        $("#lCont").append('<img src="img/LogoKlein.png" class="img-responsive pull-left" style="margin-top:'+ relativeSize('1vh', 1) +'; width:'+ relativeSize('20vmin', 20) +';" alt="Klein-Miljø" >\
		<p class="pull-left" style="margin-left: 25px; margin-top: 15px;" >Klein-Miljø Pris Indicator</p>');
	};
	
	//used above to know if we need to handle a backBtn, but also to determine how to style certain elements... this is done because certain older windows and apple phone will have trouble with styling compatability...
    function isiPhone() {
        if(device.platform === "iPhone") {
            return true;
        };
        return false;
    };
    
    //gives us the size of the display, used on non-iPhone devices for some relative styling
    var sizeHelper = 0;
    function getSize() {
        if($(window).width() < $(window).height()) {
            sizeHelper = $(window).width()/100;
        }else {
            sizeHelper = $(window).height()/100;
        };
    };
    
    //used to return the proper styling we need, basically creating a vw that actually works on all devices
    function relativeSize(defaultStyling, calcSize) {
        if(isiPhone()) {
            return defaultStyling;
        }else {
            var calc = sizeHelper*calcSize;
            return calc+"px";
        };
    };
    
    function onBackKeyDown() {
        
		/* Include if using modals, otherwise, pressing back SHOULD do nothing...
        modalW.empty();
        
        setTimeout(function() {
            $(modalW).append('<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
              <div class="modal-dialog">\
                <div class="modal-content">\
                  <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                    <h4 class="modal-title" id="myModalLabel">Luk NemVagt?</h4>\
                  </div>\
                  <div class="modal-body">\
                    Er du sikker på at du ønsker at lukke NemVagt app\'en?\
                  </div>\
                  <div class="modal-footer">\
                    <button type="button" class="btn btn-default btn-lg pull-left" data-dismiss="modal">Nej</button>\
                    <button type="button" class="btn modalYesBtn btn-default btn-lg pull-right">Ja</button>\
                  </div>\
                </div>\
              </div>\
            </div>');
        
        //defines the setup changes of the modal, show===true so the modal is shown
        var options = {show: true};
        //applies the changes defined in var options
        $("#myModal").modal(options);
        //sets the title of the modal, so people know where they are
        //$(".modal-title").html(title); is done directly in the html
        
        $(".modalYesBtn").on("click", function() {
            navigator.app.exitApp();
        });
        
        $(".modalYesBtn").on("click", function() {
            $("#myModal").modal("hide");
        });
        
        $("#myModal").on("hidden.bs.modal", function() {
            modalW.empty();
        });
        
        }, 10);
		*/
    };
	
});
};



