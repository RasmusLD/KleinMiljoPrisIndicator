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
        }, 2000);
    }
};

function phonegapReady() {

$(document).ready(function(){
	
	//creates var body, that will be used on every page.
    var body;
	
	//this must be the first function, so that the JS instantiates properly
    $(function runOnLoad(){
		
		//instantiates all the data variables we'll be using
		instantiateData();
		
		//we need this for some relative styling on non iPhones...
        getSize();
		
        //needed to show the logo on top of all screens
        showLogo();
		
		//needed to show the menu on top of all screens
		showMenu();
		
		//shows the contact information on the bottom of all screens
		showContactInfo();
        
        //is used to listen for the "pause" event...
        document.addEventListener("pause", onPause, false);
        
        //we're listening for iPhone because windows phones have a backBtn but don't support device.platform...
        //omitted because the default event cannot currently be overridden
		//if(!isiPhone) {
            //document.addEventListener("backbutton", onBackKeyDown, false);
        //};
		
		//instantiates var body to the dom element "#bCont", personal preference, but can't be changed without fixing it in the code multiple places.
		//doing it this way means it's not strictly necessary to write $(body), you can just use body
		body = $("#bCont");
		
		//starts up the "bygninger" option, could start on any of the pages, but we want to start somewhere
		//a page explaining the app could be called instead.
		//showBygninger(); OMITTED WHILE TESTING
		
		testAccess();
	});
	
	//closes the app on pause
    function onPause() {
		//closes the app, if people minimize/navigate away from it, also means the app always starts fresh.
		//closing the app is done to ensure consistent behaviour when opening the app.
        //it is done this way instead of using the exit-on-suspend preference, because that doesn't always work
		navigator.app.exitApp();
    };

//Grouping Start (grouped for convenience, as they do roughly the same things)
//functions called to show the different options, they are called from the menu and showBygninger is also called initially on start-up
	function showBygninger() {
		//done to clean the "body"
		$(body).empty();
		
		//timeout is set to circumvent the inherent stack/dom/layer issues of JS
		setTimeout(function() {
			
			//the var we append to body later on in this method
			var toAppend = '<form id="proveForm" class="form-group optionGroup" role="form" method="post" action="">';
			//a string to store all the select options in, so that we can add them all together append them to the form
			var selectOptions = '<option value="default" disabled selected >Vælg fra menuen</option>';
			
	/*
	-Der SKAL tilføjes en listen'er, så at der altid laves en ekstra dropdown menu,
	når den gamle er blevet udfyldt... (noget allá, .selectKLasse -> onDeselect -> repeat the "for-each loop")
	Dette er ikke umiddelbart understøttet og vil blive mere komplekst end som så... (onDeselect functionaliteten
	findes tilsyneladende ikke, man er altså nødt til selv at bygge den, f.eks. ved at lave en listener på alt
	andet end den .dropdown, og så fjerne listeneren fra andre dropdowns når man laver en ny. )
	-Et andet problem, som dog er relateret til det ovenstående er at der skal matches priser/selects
	med deres respektive valgte antal, så man kan få en samlet pris
	
	-Der SKAL også laves en info knap, der kan vise "info" om det man har valgt...
	Jeg er pt. usikker på hvordan jeg bedst er 100% sikker på at det altid er den rigtige info jeg vælger
	en mulighed er at give alt data (det har det måske allerede, som kan tilgås) et unikt id og sætte value
	til dette, og så iterere igennem for-each loop'et og finde hvor id'et matcher, for så at tage den data jeg skal bruge...
	*/
			//iterates through all objects in bygningerOBJ and runs a for loop for each one, letting us add all the options that exist
			for(var optionObject in bygningerOBJ) {
				for(var i = 0; i < bygningerOBJ[optionObject].length; i++) {
					var object = bygningerOBJ[optionObject][i];
					selectOptions += "<option value="+object["pris"]+">"+object["beskrivelse"]+"</option>";
				};
			};
			
			toAppend +='\
				<select id="proveType" name="proveType" class="optionsClass form-control">\
					'+ selectOptions +'\
				</select>\
				<div class="input-group form-group">\
					<span class="input-group-addon" >Vælg antal</span>\
					<input id="antalProver" type="number" name="antalProver" class="optionsClass form-control" value="1">\
				</div>';
			
			//adds a submit button
			toAppend += '<button id="lavUdregning" type="submit" style="margin-top: 5px; margin-bottom: 5px;" class="btn btn-success btn-lg" action="">Lav udregning</button>';
			//closes the form
			toAppend += '</form>';
			
			//appends the form to the body
			$(body).append(toAppend);
			
			//an onclick listener, that targets the form's submit button and overrides the default event
			$("#lavUdregning").on("click", function(event) {
				event.preventDefault();
				handleResult();
			});
			
		}, 1);
	};
	function showGeoteknik() {
		//done to clean the "body"
		$(body).empty();
		
		//timeout is set to circumvent the inherent stack/dom/layer issues of JS
		setTimeout(function() {
			
			//the var we append to body later on in this method
			var toAppend = '<form id="proveForm" class="form-group optionGroup" role="form" method="post" action="">';
			//a string to store all the select options in, so that we can add them all together append them to the form
			var selectOptions = '<option value="default" disabled selected >Vælg fra menuen</option>';
			
			//iterates through all objects in geoteknikOBJ and runs a for loop for each one, letting us add all the options that exist
			for(var optionObject in geoteknikOBJ) {
				for(var i = 0; i < geoteknikOBJ[optionObject].length; i++) {
					var object = geoteknikOBJ[optionObject][i];
					selectOptions += "<option value="+object["pris"]+">"+object["beskrivelse"]+"</option>";
				};
			};
			
			toAppend +='\
				<select id="proveType" name="proveType" class="optionsClass form-control">\
					'+ selectOptions +'\
				</select>\
				<div class="input-group form-group">\
					<span class="input-group-addon" >Vælg antal</span>\
					<input id="antalProver" type="number" name="antalProver" class="optionsClass form-control" value="1">\
				</div>';
			
			//adds a submit button
			toAppend += '<button id="lavUdregning" type="submit" style="margin-top: 5px; margin-bottom: 5px;" class="btn btn-success btn-lg" action="">Lav udregning</button>';
			//closes the form
			toAppend += '</form>';
			
			//appends the form to the body
			$(body).append(toAppend);
			
			//an onclick listener, that targets the form's submit button and overrides the default event
			$("#lavUdregning").on("click", function(event) {
				event.preventDefault();
				handleResult();
			});
			
		}, 1);
	};
	function showJord() {
		//done to clean the "body"
		$(body).empty();
		
		//timeout is set to circumvent the inherent stack/dom/layer issues of JS
		setTimeout(function() {
			
			//the var we append to body later on in this method
			var toAppend = '<form id="proveForm" class="form-group optionGroup" role="form" method="post" action="">';
			//a string to store all the select options in, so that we can add them all together append them to the form
			var selectOptions = '<option value="default" disabled selected >Vælg fra menuen</option>';
			
			//iterates through all objects in jordOBJ and runs a for loop for each one, letting us add all the options that exist
			for(var optionObject in jordOBJ) {
				for(var i = 0; i < jordOBJ[optionObject].length; i++) {
					var object = jordOBJ[optionObject][i];
					selectOptions += "<option value="+object["pris"]+">"+object["beskrivelse"]+"</option>";
				};
			};
			
			toAppend +='\
				<select id="proveType" name="proveType" class="optionsClass form-control">\
					'+ selectOptions +'\
				</select>\
				<div class="input-group form-group">\
					<span class="input-group-addon" >Vælg antal</span>\
					<input id="antalProver" type="number" name="antalProver" class="optionsClass form-control" value="1">\
				</div>';
			
			//adds a submit button
			toAppend += '<button id="lavUdregning" type="submit" style="margin-top: 5px; margin-bottom: 5px;" class="btn btn-success btn-lg" action="">Lav udregning</button>';
			//closes the form
			toAppend += '</form>';
			
			//appends the form to the body
			$(body).append(toAppend);
			
			//an onclick listener, that targets the form's submit button and overrides the default event
			$("#lavUdregning").on("click", function(event) {
				event.preventDefault();
				handleResult();
			});
			
		}, 1);
	};
//Grouping End
	
	//a function to handle the calculation and showing of results.
	function handleResult() {
		
		//the value of the proveType option is the price of the option
		var price = $("#proveType").val();
		
		//the value of the antalProver is the number of times we want the option performed
		var number = $("#antalProver").val();
		
		//the result of the options
		var result = parseFloat(price) * parseFloat(number);
		
		//append the result to the body, to show our price
		$(body).append('<h3>Pris for prøven: '+ result +' kr<h3>');
	};
	
//TESTING GROUP START
	
	//testing access to data and page setup
	function testAccess() {
		
		$(body).empty();
		
		//timeout is set to circumvent the inherent stack/dom/layer issues of JS
		setTimeout(function() {
			
			//$(body).append('<p>er i timeout\'et hvor formen laves og append\'es formen.</p>');
			
			//the var we append to body later on in this method
			var toAppend = '<form id="testProveForm" class="form-group optionGroup" role="form" method="post" action="">';
			//a string to store all the select options in, so that we can add them all together append them to the form
			var selectOptions = '<option value="default" disabled selected >Vælg fra menuen</option>';
			
			//$(body).append('<p>skal til at starte for loop\'et som går igennem/tilgår dataen.</p>');
			//$(body).append('<p>'+ bygningerOBJ["MaterialeProver"].length +'</p>');
			//$(body).append('<p>'+ bygningerOBJ["MaterialeProver"][0]["beskrivelse"] +'</p>');
			
			//bygningerOBJ["MaterialeProver"][0]["beskrivelse"]
			
			for(var i = 0; i < bygningerOBJ["MaterialeProver"].length; i++) {
				//$(body).append('<p>skal til at definerer var object.</p>');
				var object = bygningerOBJ["MaterialeProver"][i];
				//$(body).append('<p>objectets pris: '+ object["pris"]+'.</p>');
				selectOptions += "<option value="+object["pris"]+">"+object["beskrivelse"]+"</option>";
				//$(body).append('<p>alt i loopet er nu gjort, kører måske igen?</p>');
			};
			
			//var data = bygningerOBJ["MaterialeProver"];
			
			//$(body).append('<p>skal til at tilføje strukturen til toAppend, inklusiv at proppe selectOptions derind.</p>');
			toAppend +='<div class="input-group form-group">\
					<select name="proveType" class="optionsClass selectClass form-control">\
						'+ selectOptions +'\
					</select>\
					<div class="input-group form-group">\
						<span class="input-group-addon" >Vælg antal</span>\
						<input type="number" name="antalProver" class="optionsClass numberClass form-control" value="1">\
					</div>\
					<select name="proveType" class="optionsClass selectClass form-control">\
						'+ selectOptions +'\
					</select>\
					<div class="input-group form-group">\
						<span class="input-group-addon" >Vælg antal</span>\
						<input type="number" name="antalProver" class="optionsClass numberClass form-control" value="1">\
					</div>\
					<select name="proveType" class="optionsClass selectClass form-control">\
						'+ selectOptions +'\
					</select>\
					<div class="input-group form-group">\
						<span class="input-group-addon" >Vælg antal</span>\
						<input type="number" name="antalProver" class="optionsClass numberClass form-control" value="1">\
					</div>\
					<button hidden disabled type="submit" class="infoBtnClass btn btn-sm" action="">More options</button>\
				</div>';
			
			//adds a submit button to the UserProfile form, done outside the "for loop" it will always be at the end of the form
			toAppend += '<button id="lavUdregning" type="submit" style="margin-top: 5px; margin-bottom: 5px;" class="btn btn-success btn-lg" action="">Lav udregning</button>';
			//closes the UserProfile form, done here outside the "for loop", since we don't know how long the form will be //showHandleResult
			toAppend += '</form>';
			
			//$(body).append('<p>har lukket form strengen og skal til at tilføje den til body.</p>');
			
			//appends the data from this method
			$(body).append(toAppend);
			//$(body).append('<p>har append\'et formen og skal til at lave en listener på knappen.</p>');
			
			$("#lavUdregning").on("click", function(event) {
				event.preventDefault();
				testHandleResult();
			});
			
			//handles the onclick events for info buttons
			//$(".infoBtnClass").on("click", function(event) {
				//event.preventDefault();
				//$(this).closest(".form-control").
			//});
			
			//$(body).append('<p>har lavet en listener og er nu færdig med metoden.</p>');
			
		}, 1);
		
	};
	function testHandleResult() {
		var price = 0;
		var number = 0;
		var result = 0;
		
		var selectElements = $(".selectClass");
		for(var option in selectElements) {
			if(option.val() !== "default") {
				price = option.val();
				number = option.closest(".numberClass").val();
				result += parseFloat(price) * parseFloat(number);
			};
		};
		//the value of the proveType option is the price of the option
		//var price = $("#proveType").val();
		//$(body).append('<p>price: '+ price +'</p>');
		//the value of the antalProver is the number of times we want the option performed
		//var number = $("#antalProver").val();
		//$(body).append('<p>number: '+ number +'</p>');
		//the result of the options
		//var result = parseFloat(price) * parseFloat(number);
		$(body).append('<h3>Pris for prøven: '+ result +' kr<h3>');
		
	};
	function testMoreOptions() {
		
		//timeout is set to circumvent the inherent stack/dom/layer issues of JS
		setTimeout(function() {
			
			var testMoreOptionsVar;
			var testMoreOptionsOptionString = '';
			
			for(var i = 0; i < bygningerOBJ["MaterialeProver"].length; i++) {
				var testObject = bygningerOBJ["MaterialeProver"][i];
				testMoreOptionsOptionString += "<option value="+testObject["pris"]+">"+testObject["beskrivelse"]+"</option>";
			};
			
			testMoreOptionsVar ='<div class="input-group form-group">\
					<select name="proveType" class="selectClass form-control">\
						'+ testMoreOptionsOptionString +'\
					</select>\
					<input type="number" name="antalProver" class="form-control" value="0">\
					<button type="submit" class="infoBtnClass btn btn-success btn-lg" action="">info</button>\
				</div>';
			
			//appends the data from this method
			$("#testProveForm").append(testMoreOptionsVar);
		}, 1);
		
	};
//TESTING GROUP END
	
	//inserts the "Klein-Miljø" logo in top of all pages.
	function showLogo() {
        $("#lCont").append('<img src="img/LogoKlein.png" class="img-responsive pull-left" style="margin-top: 1vmin; width: 20vmin;" alt="Klein-Miljø" > <p class="pull-left" style="margin-left: 25px; margin-top: 25px;" >Klein-Miljø Pris Indicator</p>');
	};
	
	//insert the contact information for Klein-Miljø on the bottom of all pages.
	function showContactInfo() {
		$("#cCont").append('<p>Klein-Miljø - Telefon: +45 20856292 - Kontor: Titmosevej 1, 4200 Slagelse - Filial: Gl. Køge Landevej 55, 3., 2500 Valby - E-mail: info@geologiskraadgivning.dk</p>');
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
    
	//this is called when the "back key" is pressed,
	//but it seems that the default action can no longer be surpressed...
    function onBackKeyDown() {
        
		/* Can be included/fixed if the default action can be overridden.
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
                    -- spørge-tekst --\
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
	
	//creates a menu so that it's possible to navigate the app in general
    function showMenu() {
        
        var styling = 'style="margin-left: 7px; padding: 5px; font-size:16px;"';
        //creates a menu we can see in all pages. Add class=".navbar-fixed-top" to the #menu div, if menu should stick to top of screen instead of sticking to the top of the page.
		//be aware that using navbar-fixed-top will make the position absolute (you can't use float)
		//also if absolute the navbar might be in the same space as the logo on smaller screens
        $("#mCont").append('<div class="dropdown" id="menu">\
        <button class="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown">\
        <span id="menuIcon" class="glyphicon glyphicon-th-list"></span></button>\
        <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu">\
          <li role="presentation"><a id="bygningerMenu" '+ styling +' role="menuitem" tabindex="-1" href="#">Bygninger</a></li>\
		  <li role="presentation" class="divider"></li>\
          <li role="presentation"><a id="geoteknikMenu" '+ styling +' role="menuitem" tabindex="-1" href="#">Geoteknik</a></li>\
          <li role="presentation" class="divider"></li>\
          <li role="presentation"><a id="jordMenu" '+ styling +' role="menuitem" tabindex="-1" href="#">Jord</a></li>\
        </ul>\
      </div>');
        
        //these methods are needed to assign "click" events to the menu buttons...
        $("#bygningerMenu").on("click", showBygninger);
        $("#geoteknikMenu").on("click", showGeoteknik);
        $("#jordMenu").on("click", showJord);
        
    };
	
	//called from phonegapReady, instantiates all the data we'll be using.
	//OBS the "komplet objekt'er" have to be global, ie. don't call them var; Otherwise you can't reach them.
	function instantiateData() {
//objekter / array /info / information; Diverse info vedr. miljøpriser etc
	
	//Objekternes data tilgås således:
	//Vælg objekt(f.eks. bygningerOBJ),
		//vælg en attribut og en plads i det array som gemmer sig bag attributten(f.eks. MaterialeProver & 0),
		//nu har man så et objekt med data (i det konkrete eksempel bmpASB), vælg så en attribut (f.eks. beskrivelse) og så objekts beskrivelse
	//koden fra eksemplet over ville se sådan her ud:
		//bygningerOBJ["MaterialeProver"][0]["beskrivelse"]
	
//Bygninger start
	
	//Bygninger > Materiale Prøver
	var bmpASB = {beskrivelse: "Asbest i materialeprøve -mikroskopi", pris: 460.00, info: "I forbindelse med renovering eller nybyggeri kan det være nødvendigt at undersøge materialer, luft eller jord for asbest. Asbest er en fælles betegnelse for en gruppe af fiberformede silikater.\n\
\n\
Asbest typebestemmes og kvantificeres at kvantificere asbest i jord efter metoden: PLM (polariseret lys mikroskopi) på asbestfibre >50 µm, omregning iht Miljøprojekt nr. 1360-2011.\n\
Der kendes adskillige asbestmineraler, men specielt tre typer har fundet anvendelse:\n\
\n\
Hvid asbest (chrysotil)\n\
Brun asbest (amosit)\n\
Blå asbest (crocidolit)\n\
Asbestos\n\
I dag er asbest dokumenteret kræftfremkaldende. Og det er karakteristisk, at der ikke kan sættes en nedre grænse for den sundhedsfarlige koncentration. I Danmark menes asbest at have været anvendt i op mod 3.000 forskellige produkter, især i lofts- og vægbeklædninger, i gulvmaterialer og som isolations- og brandhæmmende materiale.\n\
Har du brug for hjælp eller vejledning, kontakt en af vore konsulenter"};
	var bmpBLY = {beskrivelse: "Bly i maling", pris: 172.50, info: "Bly er et metal, der afhængig af dets kemiske forbindelser, kan indebære forskellige miljø og sundhedsskadelige effekter for mennesker og miljø. Bly optages i kroppen gennem mund, næse, slimhinder og i mindre omfang gennem huden.\n\
	Mange ældre malingstyper indeholder metaller herunder bly. Der findes en række regler der skal overholdes i forbindelse med renoveringsarbejder og nedrivning, både i forbindelse med arbejdsmiljø og bortskaffelse af bygningsmaterialer. Hvis du har brug for information eller vejledning, kontakt en af vore konsulenter."};
	var bmp6MET = {beskrivelse: "6 metaller (Cd,Cu,Cr,Ni,Pb,Zn) i maling", pris: 201.25, info: "Maling kan indeholde en række tungmetaller der kan være sundhedsskadelige. Der findes en række grænseværdier der har indflydelse på arbejdsmiljø og bortskaffelse."};
	var bmpFUG = {beskrivelse: "PCB i fugemasse", pris:460.00 , info: "PCB har været brugt i byggeriet i Danmark i bygninger, der er opført eller renoveret i perioden 1950 – 1977\n\
Inden en bygning renoveres eller rives ned, skal det undersøges, om den indeholder PCB. Resultatet af undersøgelsen skal anmeldes til kommunen. Hvis bygningen indeholder PCB-holdige materialer, skal de fjernes fra bygningen, inden renovering eller nedrivning. Det PCB-holdige affald skal bortskaffes efter gældende regler, så PCB ikke spredes i miljøet.\n\
PCB identificeres indledningsvis ud fra bygningens alder. Herudover ved visuel gennemgang af mulige kilder og ved faktiske måling af relevante byggematerialer og i indeluft. Selvom der er PCB i bygningen, er det ikke givet, at indholdet er forbundet med en øget helbredsrisiko\n\
PCB er underlagt grænseværdier for, hvornår PCB-holdigt materiale er farligt affald, og aktionsværdier for, hvor stor koncentrationen må være i indeluften, før det er at betragte som en øget helbredsrisiko. Kontakt en af vore konsulenter for at drøfte din sag."};
	var bmpMAL = {beskrivelse: "PCB i maling", pris: 460.00, info: "PCB har været brugt i byggeriet i Danmark i bygninger, der er opført eller renoveret i perioden 1950 – 1977\n\
Inden en bygning renoveres eller rives ned, skal det undersøges, om den indeholder PCB. Resultatet af undersøgelsen skal anmeldes til kommunen. Hvis bygningen indeholder PCB-holdige materialer, skal de fjernes fra bygningen, inden renovering eller nedrivning. Det PCB-holdige affald skal bortskaffes efter gældende regler, så PCB ikke spredes i miljøet.\n\
PCB identificeres indledningsvis ud fra bygningens alder. Herudover ved visuel gennemgang af mulige kilder og ved faktiske måling af relevante byggematerialer og i indeluft. Selvom der er PCB i bygningen, er det ikke givet, at indholdet er forbundet med en øget helbredsrisiko\n\
PCB er underlagt grænseværdier for, hvornår PCB-holdigt materiale er farligt affald, og aktionsværdier for, hvor stor koncentrationen må være i indeluften, før det er at betragte som en øget helbredsrisiko. Kontakt en af vore konsulenter for at drøfte din sag."};
	var bmpBET = {beskrivelse: "PCB i knust beton", pris: 402.50, info: "Hvis der er benyttet PCB holdig maling på beton, er der flere muligheder, enten at sandblæse malingen af eller at deponere betonen med det PCB holdige maling. Den mest økonomiske løsning afhænger af forholdet mellem PCB og beton. Der udtages en prøve af beton og måles for indholdet af PCB."};
	var bmpCHL = {beskrivelse: "Chlorparaffiner (ikke-akkrediteret)", pris: 1092.50, info: "Er der mistanke om Chlorparaffiner udtages en materialeprøve og koncentrationes måles. Prøven er ikke akkrediteret."};
	
	//array med info vedr. Materiale Prøver
	var bygMaterialeProver = [bmpASB, bmpBLY, bmp6MET, bmpFUG, bmpMAL, bmpBET, bmpCHL];
	
	
	//Bygninger > Indeklima
	var binOGF = {beskrivelse: "Olie v. GC FID", pris: 641.50, info: ""};
	var binOAB = {beskrivelse: "Olie, C9-C10 aromater og BTEX", pris: 923.25, info: ""};
	var binCHO = {beskrivelse: "Chlorede opløsningsmidler", pris: 693.25, info: ""};
	var binCHN = {beskrivelse: "Chlorede nedbrydningsprodukter", pris: 693.25, info: ""};
	var binPOO = {beskrivelse: "Polære opløsningsmidler", pris: 986.5 , info: ""};
	var binOBC = {beskrivelse: "Olie, C9-C10 aromater og BTEX og chlorede opløsningsmidler", pris: 1015.25, info: ""};
	var binFOM = {beskrivelse: "Formaltehyd", pris: 1849.00, info: "Koncentrationen af formaldehyd i inde luften måles og afrapporteres i forhold til nationale og internationale standarter."};
	var binASB = {beskrivelse: "Asbest", pris: 999.00, info: "Koncentrationen af asbestfibre i inde luften måles og afrapporteres i forhold til nationale og internationale standarter. Afrapporteres med anbefalinger til håndtering af problematikken."};
	var binKVS = {beskrivelse: "Kviksølv", pris: 999.00, info: "Koncentrationen af kviksølv i inde luften måles og afrapporteres i forhold til nationale og internationale standarter."};
	var binPCB = {beskrivelse: "PCB", pris: 999.00, info: "Koncentrationen af PCB i inde luften måles og afrapporteres i forhold til nationale og internationale standarter."};
	var binFGT = {beskrivelse: "Fugt", pris: 999.00, info: "Fugt kan være en problematik i forhold til indeklima, med hovedpine og anden følelse af ubehag. Fugt, temperatur og træk, kan kortlægges. \nAfrapporteringen indeholder anbefalinger til at forbedre indeklima. \nKontakt en konsulent for en drøftelse af indeklima problematikker."};
	var binTMP = {beskrivelse: "Temperatur", pris: 999.00, info: "Fugt kan være en problematik i forhold til indeklima, med hovedpine og anden følelse af ubehag. Fugt, temperatur og træk, kan kortlægges. \nAfrapporteringen indeholder anbefalinger til at forbedre indeklima. \nKontakt en konsulent for en drøftelse af indeklima problematikker."};
	var binTVO = {beskrivelse: "TVOC", pris: 999.00, info: "TVOC (Total Volatile Organic Compounds) er en fællesbetegenelse for 10 miljøfremmede stoffer i kategorierne Totalkulbrinter, BTEX, C9/C10-aromater, chlorerede opl. og nedbrydningsprodukter. \nKoncentrationerne i inde luften måles og afrapporteres i forhold til nationale og internationale standarter."};
	
	//array med info vedr. Indeklima
	var bygIndeklima = [binOGF, binOAB, binCHO, binCHN, binPOO, binOBC, binFOM, binASB, binKVS, binPCB, binFGT, binTMP, binTVO];
	
	
	//Bygninger > Råd og svamp
	var brsMST = {beskrivelse: "Mycometer-surface test", pris: 718.75, info: "Skimmelprøve; Mycometer-surface test. Ved inspektion opmåles arealet af det berørte område. Laboratorietesten fastlægger hvilken type der er tale om. I afrapporteringen beskrives anbefalinger til udbedring af angrebet. Rapporten er også dokumentation i forbindelse med en eventuel forsikringssag. Kontakt en af vore konsulenter for nærmere rådgivning."};
	var brsBST = {beskrivelse: "Bactiquant-surface test", pris: 718.75, info: "Bakterier bruges mest i forbindelse med oversvømmelse af kloak. Bactiquant-surface test (bakterie test)\nVed inspektion opmåles arealet af det berørte område. Laboratorietesten fastlægger hvilken type der er tale om. I afrapporteringen beskrives anbefalinger til udbedring af angrebet. Rapporten er også dokumentation i forbindelse med en eventuel forsikringssag. Kontakt en af vore konsulenter for nærmere rådgivning."};
	var brsLMA = {beskrivelse: "Luftmåling, Mycometer-Air", pris: 718.75, info: "Måler skimmelsporer i indeluft. /nNB kan ikke stå alene"};
	var brsTOM = {beskrivelse: "Træprøver og øvrige materialeprøver", pris: 661.25, info: "Udtag en prøve og tag foto. Indsend prøve bruges til råd og svamp. \nVed inspektion opmåles arealet af det berørte område. Laboratorietesten fastlægger hvilken type der er tale om. I afrapporteringen beskrives anbefalinger til udbedring af angrebet. Rapporten er også dokumentation i forbindelse med en eventuel forsikringssag. Kontakt en af vore konsulenter for nærmere rådgivning."};
	var brsVAA = {beskrivelse: "V8-agar aftryksprøve", pris: 632.50, info: "Typebestemmelse af skimmel, bruges som tillæg, kan ikke stå alene, bruges mest i forbindelse med \"sygdom\". Hvor beborer er blevet tilset af læge. \nVed inspektion opmåles arealet af det berørte område. Laboratorietesten fastlægger hvilken type der er tale om. I afrapporteringen beskrives anbefalinger til udbedring af angrebet. Rapporten er også dokumentation i forbindelse med en eventuel forsikringssag. Kontakt en af vore konsulenter for nærmere rådgivning."};
	
	//array med info vedr. Råd og svamp
	var bygRadOgSvamp = [brsMST, brsBST, brsLMA, brsTOM, brsVAA];
	
	
	//Bygninger > Andre ydelser
	var bayIBP = {beskrivelse: "Inspektion af bygning-prøvetagning", pris: 2000.00, info: ""};
	var bayART = {beskrivelse: "Afrapportering", pris: 1500.00, info: ""};
	var bayIKA = {beskrivelse: "Interne konsulenttimer antal", pris: 960.00, info: ""};
	var bayEKA = {beskrivelse: "Eksterne konsulenttimer antal", pris: 960.00, info: ""};
	var bayKKM = {beskrivelse: "Kørsel Km", pris: 3.70, info: ""};
	
	//array med info vedr. Råd og svamp
	var bygAndreYdelser = [bayIBP, bayART, bayIKA, bayEKA, bayKKM];
	
	//Komplet Bygninger objekt
	bygningerOBJ = {
		MaterialeProver: bygMaterialeProver,
		Indeklima: bygIndeklima,
		RadOgSvamp: bygRadOgSvamp,
		AndreYdelser: bygAndreYdelser
	};
	
//Bygninger slut
	
//Geoteknik start
	
	//Geoteknik > Undersøgelsestype (uden boring)
	var guuGMV = {beskrivelse: "Geotekniske målinger <1,0 m (vingeforsøg)", pris: 200.00, info: "Første måling indeholder en opstartsomkostning på 1500 kr. \n\nGeoteknik i dybder under 1 meter udføres med håndgrej, resultaterne afrapporteres i geoteknisk rapport."};
	var guuKMG = {beskrivelse: "Kombinerede miljø- og geoteknisk undersøgelse (håndgrej)", pris: 400.00, info: "Første måling indeholder en opstartsomkostning på 1500 kr. \n\nGeoteknik udføres for at bestemme jordens styrkeparametre forud for byggeri. Mindre opgaver klares med håndbetjent udstyr (vingeslag). Ved større opgaver benyttes borerig, ofte kan man med fordel kombinere geotekniske og miljø undersøgelser."};
	
	//array med info vedr. Undersøgelsestype (uden boring)
	var geoUndersogelsestypeUdenBoring = [guuGMV, guuKMG];
	
	
	//Geoteknik > Undersøgelsestype (med boring)
	var gubGMD = {beskrivelse: "Geotekniske målinger dybere end 1,0m", pris: 350.00, info: "Geoteknik udføres for at bestemme jordens styrkeparametre forud for byggeri. Mindre opgaver klares med håndbetjent udstyr (vingeslag). Ved større opgaver benyttes borerig, ofte kan man med fordel kombinere geotekniske og miljø undersøgelser."};
	var gubKMG = {beskrivelse: "Kombinerede miljø- og geotekniske boringer", pris: 350.00, info: "Geoteknik udføres for at bestemme jordens styrkeparametre forud for byggeri. Mindre opgaver klares med håndbetjent udstyr (vingeslag). Ved større opgaver benyttes borerig, ofte kan man med fordel kombinere geotekniske og miljø undersøgelser."};
	
	//array med info vedr. Undersøgelsestype (med boring)
	var geoUndersogelsestypeMedBoring = [gubGMD, gubKMG];
	
	
	//Geoteknik > Ansvar og tillægsydelser
	var gatLSF = {beskrivelse: "LER-søgning inkl. forsikring", pris: 1500.00, info: "LER er en fortegnelse over rør og ledninger i jorden. Den der foretager LER søgningen påtager sig samtidig ansvaret for påboringsskader."};
	var gatOBR = {beskrivelse: "Opbrydning af belægning+ reetablering", pris: 350.00, info: "Ved borearbejder kan der opstå skader i belægninger, der skal reetableres. Prisen er en vurderet standartpris, men forbundet med stor usikkerhed."};
	
	//array med info vedr. Ansvar og tillægsydelser
	var geoAnsvarOgTillegsydelser = [gatLSF, gatOBR];
	
	
	//Geoteknik > Andre ydelser
	var gayAGB = {beskrivelse: "Afrapportering og geotekniske beregninger", pris: 4000.00, info: "Måleresultater, observationer og beregninger afrapporteres efter gældende normer."};
	var gayKUO = {beskrivelse: "Konsulenttimer ud over", pris: 750.00, info: "Dækker anvendt tid der ikke er omfattet af prøvetagning og afrapportering"};
	
	//array med info vedr. Andre ydelser
	var geoAndreYdelser = [gayAGB, gayKUO];
	
	//Komplet Geoteknik objekt
	geoteknikOBJ = {
		UndersøgelsestypeUdenBoring: geoUndersogelsestypeUdenBoring,
		UndersogelsestypeMedBoring: geoUndersogelsestypeMedBoring,
		AnsvarOgTillegsydelser: geoAnsvarOgTillegsydelser,
		AndreYdelser: geoAndreYdelser
	};
	
//Geoteknik slut
	
//Jord start
	
	//Jord > Jordprover
	var jjdJOJ = {beskrivelse: "Jordpakken Olie i jord ved GC-FID  (C6-C35)", pris: 224.25, info: ""};
	var jjdOJB = {beskrivelse: "Olie i jord + BTEX ved GC-FID Jord enkeltstående analyse", pris: 270.25, info: ""};
	var jjdPJM = {beskrivelse: "PAH (7 stk.) i jord efter Reflab 4", pris: 258.75, info: ""};
	var jjdM1M = {beskrivelse: "Metaller i jord Ét metal (As, Pb, Cd etc.)", pris: 172.50, info: ""};
	var jjdM4M = {beskrivelse: "Metaller i jord 4 metaller (Cd, Cu, Pb, Zn)", pris: 201.25, info: ""};
	var jjdM6M = {beskrivelse: "Metaller i jord 6 metaller (Cd, Cu, Cr, Ni, Pb, Zn)", pris: 224.25, info: ""};
	var jjdKVK = {beskrivelse: "Kviksølv (Hg) (10 dages levering)", pris: 316.25, info: ""};
	var jjdJOP = {beskrivelse: "Jord samlet pakke Olie + PAH", pris: 345.00, info: ""};
	var jjdJO6 = {beskrivelse: "Jord samlet pakke Olie + 6 metal (Cd, Cr, Cu, Ni, Pb, Zn)", pris: 345.00, info: ""};
	var jjdJP6 = {beskrivelse: "Jord samlet pakke PAH + 6 metal (Cd, Cr, Cu, Ni, Pb, Zn)", pris: 345.00, info: ""};
	var jjdPOB = {beskrivelse: "Jord samlet pakke Olie + PAH + 6 metal (Cd, Cr, Cu, Ni, Pb, Zn) + BTEX", pris: 431.25, info: ""};
	var jjdPOP = {beskrivelse: "Jord samlet pakke Olie + PAH + 6 metal (Cd, Cr, Cu, Ni, Pb, Zn)", pris: 402.50, info: ""};
	var jjdCAR = {beskrivelse: "Chlorede alifater efter Reflab 1", pris: 333.50, info: ""};
	var jjdCNP = {beskrivelse: "Chlorede nedbrydningsprodukter (ikke – akkrediteret)", pris: 454.25, info: ""};
	var jjdPJK = {beskrivelse: "pH i jord Kr.", pris: 126.25, info: ""};
	var jjdPCB = {beskrivelse: "PCB i jord", pris: 402.50, info: ""};
	var jjdAKP = {beskrivelse: "Asbest i jordprøve, Kvalitativ - polarisationsmikroskopi", pris: 900.00, info: ""};
	
	//array med info vedr. Jordprover
	var jorJordprover = [jjdJOJ, jjdOJB, jjdPJM, jjdM1M, jjdM4M, jjdM6M,
	jjdKVK, jjdJOP, jjdJO6, jjdJP6, jjdPOB, jjdPOP, jjdCAR, jjdCNP, jjdPJK,
	jjdPCB, jjdAKP];
	
	
	//Jord > Poreluft
	var jplOGF = {beskrivelse: "Olie v. GC FID", pris: 641.50, info: ""};
	var jplOAB = {beskrivelse: "Olie, C9-C10 aromater og BTEX", pris: 923.25, info: ""};
	var jplCOM = {beskrivelse: "Chlorede opløsningsmidler", pris: 693.25, info: ""};
	var jplCNM = {beskrivelse: "Chlorede nedbrydningsprodukter", pris: 693.25, info: ""};
	var jplPOM = {beskrivelse: "Polære opløsningsmidler", pris: 986.50, info: ""};
	var jplABC = {beskrivelse: "Olie, C9-C10 aromater og BTEX og chlorede opløsningsmidler", pris: 1015.25, info: ""};
	
	//array med info vedr. Poreluft
	var jorPoreluft = [jplOGF, jplOAB, jplCOM, jplCNM, jplPOM, jplABC];
	
	
	//Jord > Vandprover
	var jvpOGF = {beskrivelse: "Olie v. GC FID", pris: 237.50, info: ""};
	var jvpOGB = {beskrivelse: "Olie v. GC FID og BTEX v. GC FID", pris: 237.50, info: ""};
	var jvpOBG = {beskrivelse: "Olie v. GC FID og BTEX v. GC MS", pris: 312.50, info: ""};
	var jvpCOM = {beskrivelse: "Chlorede opløsningsmidler", pris: 250.00, info: ""};
	var jvpCNP = {beskrivelse: "Chlorede nedbrydningsprodukter som tillæg", pris: 250.00, info: ""};
	var jvpCON = {beskrivelse: "Chlorerede opløsningsmidler og nedbrydningsprodukter", pris: 312.50, info: ""};
	var jvpBCO = {beskrivelse: "BTEX + Chlorede opløsningsmidler v. HS-GC MS", pris: 312.50, info: ""};
	var jvpBON = {beskrivelse: "BTEX + Chlorede opløsningsmidler og nedbrydningsprodukter", pris: 375.00, info: ""};
	var jvpMV1 = {beskrivelse: "Metaller i vand v. ICP: 1 stk.", pris: 312.50, info: ""};
	var jvpMV2 = {beskrivelse: "Metaller i vand v. ICP: 2 stk.efterfølgende 80 kr pr. metal", pris: 406.25, info: ""};
	var jvpMVI = {beskrivelse: "Metaller i vand v. ICP MS: 1 stk. Kr.", pris: 375.00, info: ""};
	var jvpHGV = {beskrivelse: "Hg i vand", pris: 375.00, info: ""};
	var jvpJFJ = {beskrivelse: "Jern + filtreret Jern", pris: 437.50, info: ""};
	var jvpPDN = {beskrivelse: "Pesticider (Drikkevandsbekendtgørelsen)", pris: 2250.00, info: ""};
	var jvpPVS = {beskrivelse: "PAH i vand 7 stoffer", pris: 468.75, info: ""};
	
	//array med info vedr. Vandprover
	var jorVandprover = [jvpOGF, jvpOGB, jvpOBG, jvpCOM, jvpCNP, jvpCON,
	jvpBCO, jvpBON, jvpMV1, jvpMV2, jvpMVI, jvpHGV, jvpJFJ, jvpPDN, jvpPVS];
	
	
	//Jord > Andre ydelser
	var jayIBP = {beskrivelse: "Inspektion af bygning-prøvetagning", pris: 2000.00, info: ""};
	var jayART = {beskrivelse: "Afrapportering", pris: 1500.00, info: ""};
	var jayIKT = {beskrivelse: "Interne konsulenttimer antal", pris: 960.00, info: ""};
	var jayEKT = {beskrivelse: "Eksterne konsulenttimer antal", pris: 960.00, info: ""};
	var jayKKM = {beskrivelse: "Kørsel Km", pris: 3.70, info: ""};
	
	//array med info vedr. Andre ydelser
	var jorAndreYdelser = [jayIBP, jayART, jayIKT, jayEKT, jayKKM];
	
	//Komplet Jord objekt
	jordOBJ = {
		Jordprover: jorJordprover,
		Poreluft: jorPoreluft,
		Vandprover: jorVandprover,
		AndreYdelser: jorAndreYdelser
	};
	
//Jord slut
	
	//skabelon:
		//var givEtNavn = {beskrivelse: "", pris: , info: ""};
};
	
});
};

