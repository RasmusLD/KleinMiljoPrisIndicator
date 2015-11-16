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
	
	
	//called from phonegapReady, instantiates all the data we'll be using.
	//OBS the variables may have to be made global...
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
	var bmpASB = {beskrivelse: "Asbest i materialeprøve -mikroskopi", pris: 460.00, info: "I forbindelse med renovering eller nybyggeri kan det være nødvendigt at undersøge materialer, luft eller jord for asbest. Asbest er en fælles betegnelse for en gruppe af fiberformede silikater.\n\nAsbest typebestemmes og kvantificeres at kvantificere asbest i jord efter metoden: PLM (polariseret lys mikroskopi) på asbestfibre >50 µm, omregning iht Miljøprojekt nr. 1360-2011.\nDer kendes adskillige asbestmineraler, men specielt tre typer har fundet anvendelse:\n\nHvid asbest (chrysotil)\nBrun asbest (amosit)\nBlå asbest (crocidolit)\nAsbestos\nI dag er asbest dokumenteret kræftfremkaldende. Og det er karakteristisk, at der ikke kan sættes en nedre grænse for den sundhedsfarlige koncentration. I Danmark menes asbest at have været anvendt i op mod 3.000 forskellige produkter, især i lofts- og vægbeklædninger, i gulvmaterialer og som isolations- og brandhæmmende materiale.\nHar du brug for hjælp eller vejledning, kontakt en af vore konsulenter"};
	var bmpBLY = {beskrivelse: "Bly i maling", pris: 172.50, info: "Bly er et metal, der afhængig af dets kemiske forbindelser, kan indebære forskellige miljø og sundhedsskadelige effekter for mennesker og miljø. Bly optages i kroppen gennem mund, næse, slimhinder og i mindre omfang gennem huden.\nMange ældre malingstyper indeholder metaller herunder bly. Der findes en række regler der skal overholdes i forbindelse med renoveringsarbejder og nedrivning, både i forbindelse med arbejdsmiljø og bortskaffelse af bygningsmaterialer. Hvis du har brug for information eller vejledning, kontakt en af vore konsulenter."};
	var bmp6MET = {beskrivelse: "6 metaller (Cd,Cu,Cr,Ni,Pb,Zn) i maling", pris: 201.25, info: "Maling kan indeholde en række tungmetaller der kan være sundhedsskadelige. Der findes en række grænseværdier der har indflydelse på arbejdsmiljø og bortskaffelse."};
	var bmpFUG = {beskrivelse: "PCB i fugemasse", pris:460.00 , info: "PCB har været brugt i byggeriet i Danmark i bygninger, der er opført eller renoveret i perioden 1950 – 1977\nInden en bygning renoveres eller rives ned, skal det undersøges, om den indeholder PCB. Resultatet af undersøgelsen skal anmeldes til kommunen. Hvis bygningen indeholder PCB-holdige materialer, skal de fjernes fra bygningen, inden renovering eller nedrivning. Det PCB-holdige affald skal bortskaffes efter gældende regler, så PCB ikke spredes i miljøet.\nPCB identificeres indledningsvis ud fra bygningens alder. Herudover ved visuel gennemgang af mulige kilder og ved faktiske måling af relevante byggematerialer og i indeluft. Selvom der er PCB i bygningen, er det ikke givet, at indholdet er forbundet med en øget helbredsrisiko\nPCB er underlagt grænseværdier for, hvornår PCB-holdigt materiale er farligt affald, og aktionsværdier for, hvor stor koncentrationen må være i indeluften, før det er at betragte som en øget helbredsrisiko. Kontakt en af vore konsulenter for at drøfte din sag."};
	var bmpMAL = {beskrivelse: "PCB i maling", pris: 460.00, info: "PCB har været brugt i byggeriet i Danmark i bygninger, der er opført eller renoveret i perioden 1950 – 1977\nInden en bygning renoveres eller rives ned, skal det undersøges, om den indeholder PCB. Resultatet af undersøgelsen skal anmeldes til kommunen. Hvis bygningen indeholder PCB-holdige materialer, skal de fjernes fra bygningen, inden renovering eller nedrivning. Det PCB-holdige affald skal bortskaffes efter gældende regler, så PCB ikke spredes i miljøet.\nPCB identificeres indledningsvis ud fra bygningens alder. Herudover ved visuel gennemgang af mulige kilder og ved faktiske måling af relevante byggematerialer og i indeluft. Selvom der er PCB i bygningen, er det ikke givet, at indholdet er forbundet med en øget helbredsrisiko\nPCB er underlagt grænseværdier for, hvornår PCB-holdigt materiale er farligt affald, og aktionsværdier for, hvor stor koncentrationen må være i indeluften, før det er at betragte som en øget helbredsrisiko. Kontakt en af vore konsulenter for at drøfte din sag."};
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
	var brsVAA = {beskrivelse: "V8-agar aftryksprøve", pris: 632.50, info: "Typebestemmelse af skimmel, bruges som tillæg, kan ikke stå alene, bruges mest i forbindelse med "sygdom". Hvor beborer er blevet tilset af læge. \nVed inspektion opmåles arealet af det berørte område. Laboratorietesten fastlægger hvilken type der er tale om. I afrapporteringen beskrives anbefalinger til udbedring af angrebet. Rapporten er også dokumentation i forbindelse med en eventuel forsikringssag. Kontakt en af vore konsulenter for nærmere rådgivning."};
	
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
	var bygningerOBJ = {
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
	var geoteknikOBJ = {
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
	var jordOBJ = {
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


