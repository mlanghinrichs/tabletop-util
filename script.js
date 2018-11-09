/*Tabletop Utility and its code are Copyright 2014 Matthew Langhinrichs.
Contact webhost@tabletoputility.com for more information.*/

var rpgDice = [2,4,6,8,10,12,20];
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
var diceRoll = function(num,type,mod) {
		var hd = 0;
		for (n = 0;n < num;n++) {
		hd = hd + (Math.floor(Math.random() * (type - 1 + 1)) + 1);
		}
		return hd + mod;
	};
function timeBetween(distance,input,output) {
	var dist = 0; //distance to be traveled - set in if/elseif below
	var rawtime = 0; //raw time in mins
	var txt = ""; //txt to be printed
	var minsIn = [525600, 44640, 1440, 60, 1, 1/60]; //# mins in a whatever
	var time = [0,0,0,0,0,0]; //# of each whatever (output)
	var timeNames = ["year", "month", "day", "hour", "minute", "second"]; //the whatever names
	var distTypeIndex = document.getElementById(input); //grab array(?) of <select><option>s
	var distType = distTypeIndex.options[distTypeIndex.selectedIndex].value; //distance type - feet or miles
	//console.log(distType)
	if (distType === "ft") {	//if feet, rawtime = distance / 300
		dist = distance;
		rawtime = dist/300;
	}
	else if (distType === "mi") { //if miles, dist is 5280x larger and speed is /264 instead
		dist = distance * 5280;
		rawtime = dist/264;
	}
	for (var i=0;i<minsIn.length;i++) { //run through minsIn start to finish
		while (rawtime>=minsIn[i]) { //if the raw time is larger than a multiple of this particular whatever, increase that whatever by 1 and bring down until it isn't larger than a multiple
			time[i]++;
			rawtime-=minsIn[i];
		}
	}
	for (i=0;i<time.length;i++) {
		if (time[i] != 0 && i != 5) {
			var s = "";
			if (time[i]!=1) {
			s = "s, ";
			} else {
			s = ", ";
			}
			txt = txt + time[i] + " " + timeNames[i] + s;
			if (time[i+1]!=1) {
			s2 = "s.";
			} else {
			s2 = ".";
			}
			txt = txt + time[i+1] + " " + timeNames[i+1] + s2;
			break;
		} else if (time[i] != 0) {
			if (time[i]!=1) {
				s3 = "s.";
				} else {
				s3 = ".";
				}
			txt = txt + time[i] + " " + timeNames[i] + s3;
		}
	}
	document.getElementById(output).innerHTML = txt;
}
var diceHead = {
	roll: function(num,type,mod) {
	var resTemp = "<img src=\"resources/d" + type + "/" + diceRoll(num,type,mod) + ".png\" />";
	document.getElementById("d" + type + "h").innerHTML=resTemp;
	},
	clear: function() {
		for (i=0;i<rpgDice.length;i++) {
		document.getElementById("d" + rpgDice[i] + "h").innerHTML="<img src=\"resources/d" + rpgDice[i] + "/d" + rpgDice[i] + ".png\" />";
		}
	}
}

var repetitionFix = {
	header: function() {
		var txt = "";
		for (i=0;i<rpgDice.length;i++) {
		txt = txt + "<div onClick=\"diceHead.roll(1," + rpgDice[i] + ",0)\" id=\"d" + rpgDice[i] + "h\" class=\"diceHead\"><img src=\"resources/d" + rpgDice[i] + "/d" + rpgDice[i] + ".png\" /></div>\n"
		}
		txt = txt + "<div onClick=\"diceHead.clear()\" id=\"clearHead\" class=\"diceHead\"><img src=\"resources/clearhead.png\" /></div>\n<a href=\"contact.html\"><div class=\"nav\" style=\"padding-right:0.5em;\">Contact</div></a>\n<a href=\"news.html\"><div class=\"nav\">News</div></a>\n<a href=\"utility_index.html\"><div class=\"nav\">Index</div></a>"
		document.getElementById('header').innerHTML = txt;
	},
	encounterGen: function(type) {
		var txt="";
		for (i=0;i<rpgDice.length;i++) {
			txt = txt + "<a onClick=\"printAddDie(" + type + "Dice," + rpgDice[i] + ",'dice" + type + "')\"><img src=\"resources/d" + rpgDice[i] + "/bod.png\" /></a>";
		}
	txt = txt + "<img src=\"resources/sub.png\" onClick=\"subMod(" + type + "Mod,'" + type + "mod');\"/>";
	txt = txt + "<img src=\"resources/plus.png\" onClick=\"plusMod(" + type + "Mod,'" + type + "mod');\"/>";
	txt = txt + "<img src=\"resources/clear.png\" onClick=\"clearDice(" + type + "Dice," + type + "Mod,'dice" + type + "','" + type + "mod');\" />";
	document.getElementById(type).innerHTML = txt;
	}
}


var initMod = [0];
var atkMod = [0];
var hpMod = [0];
var dmgMod = [0];

var plusMod = function(modifier,location) {
	modifier[0]++;
	if (modifier[0] < 0) {
		var txt = "<div> - " + Math.abs(modifier[0]) + "</div>";
		}
	else {
		var txt = "<div> + " + modifier[0] + "</div>";
		}
		//console.log(modifier[0]);
	document.getElementById(location).innerHTML=txt;
}
var subMod = function(modifier,location) {
	modifier[0]--;
	if (modifier[0] < 0) {
		var txt = "<div> - " + Math.abs(modifier[0]) + "</div>";
		}
	else {
		var txt = "<div> + " + modifier[0] + "</div>";
		}
		//console.log(modifier[0]);
	document.getElementById(location).innerHTML=txt;
}

var initDice = [0,0,0,0,0,0]; 
var atkDice = [0,0,0,0,0,0];
var hpDice = [0,0,0,0,0,0];
var dmgDice = [0,0,0,0,0,0];

/*num1 type1 num2 type2 num3 type3*/
function addDie(arra,type) {
	if (arra[0]===0) {
		arra[0]++;
		arra[1] = type;
	} else if (arra[1] === type) {
		arra[0]++;
	} else if (arra[2]===0) {
		arra[2]++;
		arra[3] = type;
	} else if (arra[3] === type) {
		arra[2]++;
	} else if (arra[4]===0) {
		arra[4]++;
		arra[5] = type;
	} else if (arra[5] === type) {
		arra[4]++;
	} else {
		alert("You can't add any more types of dice!");
	}
}
function printAddDie(array,type,place) {
	addDie(array,type);
	var txt = "";
	if (array[2]===0) {
		txt = array[0] + "d" + array[1] + " ";
	}
	else if (array[4]===0) {
		txt = array[0] + "d" + array[1] + " + " + array[2] + "d" + array[3] + " ";
	}
	else if (array[4] != 0) {
		txt = array[0] + "d" + array[1] + " + " + array[2] + "d" + array[3] + " + " + array[4] + "d" + array[5] + " ";
	}
	document.getElementById(place).innerHTML=txt;
	for (j=0;j<fightArray.length;j++) {
		console.log(fightArray[j]);
	}
}
function clearDice(arra,modifier,loc1,loc2) {
	for (i=0;i<arra.length;i++) {
		arra[i] = 0;
	}
	modifier[0] = 0;
	var txt1 = "0dx";
	var txt2 = "<div> + " + arra[0] + " </div>";
	document.getElementById(loc1).innerHTML=txt1;
	document.getElementById(loc2).innerHTML=txt2;
}


//encounter_gen print code

var fightArray = [];

function fightPrint() {
	var fightText = "<h2><tr><td>Name</td><td>Init.</td><td>HP</td><td>Attack</td></tr></h2>";
	for (i=0;i<fightArray.length;i++) {
		fightText = fightText + "<tr><td>" + fightArray[i][0] + " " + fightArray[i][1] + "</td><td>" + fightArray[i][2] + "</td><td><input type=\"number\" value=\"" + fightArray[i][3] + "\" class=\"fightoutputinput\" maxlength=\"2\"></input> / " + fightArray[i][3] + "</td><td><button type=\"button\" onclick=\"fightGet(" + fightArray[i][8]/*.join()*/ + "," + fightArray[i][9] + "," + fightArray[i][10]/*.join()*/ + "," + fightArray[i][11] + ")\">Attack!</button></td></tr>";
	}
	document.getElementById("fightResult").innerHTML=fightText;
	document.getElementById("fightsort").style.display = "initial";
}
function fightAdd() {
	var x = document.getElementById("form1");
	var mName = x.elements[0].value;
	var mNum = x.elements[1].value;
	for (i=0;i<mNum;i++) {
		/*var tempArr = [];
		tempArr.push();*/
		fightArray.push([mName, (i+1), (diceRoll(initDice[0],initDice[1],0) + diceRoll(initDice[2],initDice[3],0) + diceRoll(initDice[4],initDice[5],0) + initMod[0]), (diceRoll(hpDice[0],hpDice[1],0) + diceRoll(hpDice[2],hpDice[3],0) + diceRoll(hpDice[4],hpDice[5],0) + hpMod[0]), initDice.join(), initMod.join(), hpDice.join(), hpMod.join(), atkDice.join(), atkMod.join(), dmgDice.join(), dmgMod.join()]);
	}
	//Check status of fightArray
	/*for (j=0;j<fightArray.length;j++) {
		console.log(fightArray[j]);
	}*/
	fightPrint();
	clearDice(initDice,initMod, "diceinit","initmod");
	clearDice(hpDice,hpMod,"dicehp","hpmod");
	clearDice(atkDice,atkMod,"diceatk","atkmod");
	clearDice(dmgDice,dmgMod,"dicedmg","dmgmod");
}
function fightGet(a,b,c,d,e,f,g,h,i,j,k,l,m,n) {
	var temp1 = [a,b,c,d,e,f];
	var temp2 = [h,i,j,k,l,m];
	var mod1 = [g];
	var mod2 = [n];
	alert("The monster rolls " + (diceRoll(temp1[0],temp1[1],0) + diceRoll(temp1[2],temp1[3],0) + diceRoll(temp1[4],temp1[5],0) + mod1[0]) + " to hit, for " + (diceRoll(temp2[0],temp2[1],0) + diceRoll(temp2[2],temp2[3],0) + diceRoll(temp2[4],temp2[5],0) + mod2[0]) + " damage!");
}
function fightSort(how) {
	fightArray = fightArray.sort(function(a,b) {
		return a[how] < b[how];
	});
	fightPrint();
}
function addPlayer() {
	var name = document.getElementById("playername").value;
	var init = document.getElementById("playerinit").value;
	var hp = document.getElementById("playerhp").value;
	fightArray.push([name, " ", init, hp, "0,0,0,0,0,0", "0", "0,0,0,0,0,0", "0", "0,0,0,0,0,0", "0", "0,0,0,0,0,0", "0"]);
	fightPrint();
}

//REGION CODE
function altInput() {
	var scaleArr = document.getElementsByName('scale');
	var scale = "";
	var output = ""
	for (var i=0;i<scaleArr.length;i++) {
		if (scaleArr[i].checked) {
			// do whatever you want with the checked radio
			scale = scaleArr[i].value;
			break;
		}
	}
	switch (scale) {
		case "city":
			output = "";
			break;
		case "country":
			output = /*"<h2 class=\"altinput\">Area: </h2><input type=\"number\" id=\"area\" class=\"altinput\" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/"<h2 class=\"altinput\">Age: </h2><input type=\"number\" id=\"age\" class=\"altinput\" /><br><br>";
			break;
		default:
			alert("Something is VERY wrong");
			break;
	}
	document.getElementById("altinput").innerHTML = output;
}
function regionButton() {
	var scaleArr = document.getElementsByName('scale');
	var scale = "";
	for (var i=0;i<scaleArr.length;i++) {
		if (scaleArr[i].checked) {
			// do whatever you want with the checked radio
			scale = scaleArr[i].value;
			break;
		}
	}
	switch (scale) {
		case "city":
			printCityType();
			getOcc("regiontableoutput");
			break;
		case "country":
			printCities();
			document.getElementById("regiontypeoutput").innerHTML = "";
			break;
		default:
			alert("Something is very wrong.");
			break;
	}
}

//City Gen

//Popsize, settlement size/type print code
function printCityType() {
	var popSize = document.getElementById("size").value
	var settlType = "";
	if(popSize <=1000){settlType = "Village";}
		else if(popSize > 1000 && popSize <= 8000){settlType = "Town";}
		else if(popSize > 8000 && popSize <= 12000){settlType = "City";}
		else {settlType = "Big City";}
	var popSqr = Math.sqrt(popSize);
	var settlSize = popSize / 38850;
	var printSize = ("<p>Settlement type: " + settlType + "<br> Size of Settlement: " + (Math.round(settlSize * 1000) / 1000) + " square mi., or around " + Math.round((5280*5280*settlSize)/(330*330)) + " (" + Math.round(Math.sqrt((5280*5280*settlSize)/(330*330))) + " by " + Math.round(Math.sqrt((5280*5280*settlSize)/(330*330))) + ") city blocks.<br></p>");
	document.getElementById("regiontypeoutput").innerHTML = printSize;
}
//Occupation statistics
function getOcc(location){
    var pop = document.getElementById("size").value;
	var settlSize = (Math.round((pop/38850) * 1000) / 1000);
	var settlSizeFeet = (settlSize * 5280 * 5280);
    var occNames = ["Shoemakers", "Furriers", "Maidservants", "Tailors", "Barbers",
                    "Jewelers", "Taverns", "Old-Clothes", "Pastrycooks",
                    "Masons", "Carpenters", "Weavers", "Chandlers", "Mercers",
                    "Coopers", "Bakers", "Watercarriers", "Scabbardmakers", 
                    "Winesellers", "Hatmakers", "Saddlers", "Chicken butchers", 
                    "Pursemakers", "Butchers", "Fishmongers", "Beer-sellers", 
                    "Buckle makers", "Plasterers", "Spice merchants", "Blacksmiths", 
                    "Painters","Doctors", "Roofers", "Locksmiths", "Bathers", 
                    "Ropemakers", "Inns", "Tanners", "Copyists", "Sculptors", 
                    "Rugmakers","Harness-Makers", "Bleachers", "Hay merchants", 
                    "Cutlers", "Woodsellers", "Glovemakers", "Woodcarvers", 
                    "Magic-shops", "Bookbinders", "Illuminators", "Booksellers", 
                    "Noble households", "Lawyers", "Clergymen", "Priests", 
                    "Law Enforcement", "Livestock"];
 
    //law enforcement- popSize/125; also popSize/300 for range--> if statement
    var occPerCapita = [150, 250, 250, 250, 350, 400, 400, 400, 500, 500, //9
                    550, 600, 700, 700, 700, 800, 850, 850, 900, 950, //19
                    1000, 1000, 1100, 1200, 1200, 1400, 1400, 1400, //27
                    1400, 1500, 1500, 1700, 1800, 1900, 1900, 1900, //35
                    2000, 2000, 2000, 2000, 2000, 2000, 2100, 2300, //43
                    2300, 2400, 2400, 2400, 2800, 3000, 3900, 6300, //51
                    200, 650, 40, (25*40), 125, (5/11)]; //58
    var txt = "";
    var occReturn = 0;
    txt = txt + "<div>Mouse over a number to see roughly how far apart each will be.</div><div>One every <input type=\"number\" class=\"citydistoutput\" id=\"perfeet\" /> feet; One every <input type=\"number\" class=\"citydistoutput\" id=\"perblock\" /> block(s).</div><br><table class=\"inlinetable\">"
    for(var i = 0; i <= 18; i++){
       
       if (occNames === 56 ) {
            occReturn = (Math.round(pop/300)) + "-" + (Math.round(pop/occPerCapita[i]));
        } else {
            occReturn= Math.round(pop/occPerCapita[i]);
        }
       txt = txt + "<tr><td>" + occNames[i] + "</td><td class=\"center\"><a href=\"#regiontypeoutput\" onmouseover=\"dispDistance(" + Math.round(Math.sqrt(settlSizeFeet/occReturn)) + "," + Math.round(10*(Math.sqrt(settlSizeFeet/occReturn)/330))/10 + ")\">" + occReturn + "</a></td></tr>" + "\n"; 
    }
	txt = txt + "</table><table class=\"inlinetable\">"
	for(var i = 19; i <= 37; i++){
       
       if (occNames === 56 ) {
            occReturn = (Math.round(pop/300)) + "-" + (Math.round(pop/occPerCapita[i]));
        } else {
            occReturn= Math.round(pop/occPerCapita[i]);
        }
       txt = txt + "<tr><td>" + occNames[i] + "</td><td class=\"center\"><a href=\"#regiontypeoutput\" onmouseover=\"dispDistance(" + Math.round(Math.sqrt(settlSizeFeet/occReturn)) + "," + Math.round(10*(Math.sqrt(settlSizeFeet/occReturn)/330))/10 + ")\">" + occReturn + "</a></td></tr>" + "\n"; 
    }
	txt = txt + "</table><table class=\"inlinetable\">"
	for(var i = 38; i <= 56; i++){
       
       if (occNames === 56 ) {
            occReturn = (Math.round(pop/300)) + "-" + (Math.round(pop/occPerCapita[i]));
        } else {
            occReturn= Math.round(pop/occPerCapita[i]);
        }
       txt = txt + "<tr><td>" + occNames[i] + "</td><td class=\"center\"><a href=\"#regiontypeoutput\" onmouseover=\"dispDistance(" + Math.round(Math.sqrt(settlSizeFeet/occReturn)) + "," + Math.round(10*(Math.sqrt(settlSizeFeet/occReturn)/330))/10 + ")\">" + occReturn + "</a></td></tr>" + "\n"; 
    }
	txt = txt + "</table>"
	txt = txt + "<br><h2>Also, " + Math.round(pop/occPerCapita[57]) + " livestock, " + Math.round(0.68*(pop/occPerCapita[57])) + " of which is poultry.</h2>"
	document.getElementById(location).innerHTML = txt;
}              
//0 -> 28 29 -> 57
function dispDistance(num1, num2) {
	document.getElementById("perfeet").value = num1;
	document.getElementById("perblock").value = num2;
}

//County Gen
//Ask for population (pop), geographic size (size), and age (age)
//maybe we can work on a randomly generating population and age thing
//hopefully this works?

function cities(pop1, size, age1){
	var mod = 0;
	var popN = 0;
	var popCities = [];
	var txt = "<table class=\"centeredtable\">";
    //density- randomly generated
    var density = (diceRoll(6,4,0))*5;    
	txt = txt + "<tr><td>Density</td><td>" + density + " per sq. mi.</td></tr>\n"
	//temp size maker
	var size1 = (pop1/density);
    //largest
	var more = true;
        mod = diceRoll(2, 4, 10);
        popN = Math.round((Math.sqrt(pop1))*mod);
    popCities.push(popN);
    var numCities = 1;

    //second-largest
    mod = (diceRoll(2, 4, 0))*0.1;
    popN = Math.round(popN*mod);
    if(popN < 8000){ more = false; }
    else{ 
        popCities.push(popN);
        numCities++;
    }

    //other cities
    while(more === true){
        mod = (diceRoll(2, 4, 0))*0.05;
        popN = Math.round(popN- (popN*mod));
        if(popN < 8000){ more = false;}
        else{ 
            popCities.push(popN);
            numCities++;
        }
    }
	for (i=0;i<popCities.length;i++) {
		txt = txt + "<tr><td>City " + (i+1) + " Population</td><td>" + popCities[i] + " people</td></tr>\n";
	}

    //towns
    var towns = numCities*(diceRoll)(2, 8, 0);
	txt = txt + "<tr><td>Smaller Towns</td><td>" + towns + "</td></tr>\n";

    //Land distribution
	txt = txt + "<tr><td>Total Area</td><td>" + Math.round(size1) + " sq. mi.</td></tr>\n";
    var landSettled = Math.round(pop1/180);
	txt = txt + "<tr><td>Settled Land</td><td>" + landSettled + " sq. mi. (" + Math.round(100*(landSettled/size1)) + "%)</td></tr>\n";
    var landWild = Math.round(size1-landSettled);
	txt = txt + "<tr><td>Wild Land</td><td>" + landWild + " sq. mi. (" + Math.round(100*(landWild/size1)) + "%)</td></tr>\n";

    //Castles
    var ruinCastles = Math.round((pop1/5000000)*Math.sqrt(age1));
	txt = txt + "<tr><td>Ruined Castles</td><td>" + ruinCastles + "</td></tr>\n";
    var activeCastles = Math.round(pop1/50000);
	txt = txt + "<tr><td>Active Castles</td><td>" + activeCastles + "</td></tr>\n";
	txt = txt + "</table>"
	document.getElementById("regiontableoutput").innerHTML = txt;
}
function printCities() {
	var pop2 = document.getElementById("size").value;
	//var size2 = document.getElementById("area").value;
	var age2 = document.getElementById("age").value;
	cities(pop2,0,age2);
}



//NAMEGEN

//preset arrays
var greekBegin = ["Aes", "Ag", "Alex", "Ambr", "An", "Ant", "Ahpr", "Apoll", "Arch", "Arist", "Ath", "Ch", "Chr", "Dem", "Dam", "Dio", "Ep", "Eugen", "Eudok", "Geor", "Her", "Hier", "Kall", "Kl", "Lys", "Nik", "Pan", "Ph", "Pt", "St", "Th", "Tim", "Tryph", "Xanth"];
//middle- single vowel or vowel cluster
var greekEnd = ["kos", "tos", "tus", "the", "thon", "goras", "tolius", "nikos", "dros", "sa", "disia", "naris", "doros", "nia", "naios", "medes", "chos", "kles", "nius", "nios", "sia", "sius", "nthe"];

var celticBegin = ["Boad", "Brad", "Brean", "Brin", "Car", "Cath", "Cyn", "Donn", "Dubh", "Fedl", "Iud", "Mael", "Mac", "Kear", "Ken", "Cec", "Cian", "Ciar", "Donn", "Dub", "Eir", "Eim", "Ferr", "Finn", "Fion", "Gall", "Luch", "Lais", "Maol", "Meil", "Mur", "Pad", "Pat", "Rioc", "Ruad", "Shan", "Suib"];
//middle- single vowel
var celticEnd = ["dh", "inn", "yrn", "mh", "dhin", "ch", "bhar", "cael", "dhan", "bhne", "cy", "ng", "vael", "dor", "wan", "nan", "ghyn", "ghus", "onna", "dyr", "bhe", "bhis", "dair", "mead", "gan", "lough", "mhall", "ghall", "laic", "nach", "bharr", "ionn"];

var romanBegin = ["Aem", "Alb", "Ant", "Aquil", "Aur", "Av", "Balb", "Blan", "Cael", "Cass", "Corn", "Crisp", "Dec", "Dom", "Drus", "Fab", "Faust", "Flav", "Flor", "Hermin", "Hort", "Iul", "Iun", "Laur", "Luc", "Marc", "Mar", "Max", "Non", "Oct", "Paul", "Petr", "Pomp", "Pris", "Quint", "Reg", "Sab", "Sat", "Sept", "Serv", "Tat", "Ter", "Tib", "Tit", "Valer", "Verg", "Vib", "Vit"];
//middle- vowel and consonant
var romanEnd = ["ia", "us", "ana", "anus", "ius", "a", "ina", "inus", "ilia", "ilius", "illa", "illus", "ar", "an", "o", "entia", "etnius", "ens", "itus", "ita", "iana", "ianus", "inia", "inius"];

var norseBegin = ["Ath", "Aoal", "Ag", "Al", "Ol", "Ald", "Anu", "Alf", "Alm", "And", "Ank", "Arn", "As", "Ast", "At", "Baeg", "Ballr", "Bark", "Bjarn", "Bein", "Berg", "Blar", "Bleikr", "Both", "Bol", "Both", "Bot", "Brand", "Brok", "Brun", "Brunn", "Bryn", "Cran", "Dagr", "Djur", "Ein", "Eil", "Eld", "Er", "Far", "Fast", "Finn", "Fjol", "Folk", "Fot", "Frey", "Fr", "Fuld", "Gal", "Gand", "Gang", "Garo", "Gaut", "Gef", "Geir", "Ger", "Ginn", "Gisl", "Gjaf", "Gnauth", "God", "Grim", "Grjot", "Gunn", "Haer", "Haet", "Haf", "Hag", "Hagn", "Half", "Hall", "Har", "Hard", "Hath", "Heg", "Heith", "Heil", "Heim", "Helg", "Her", "Hildi", "Hjalm", "Hjor", "Holm", "Hraf", "Hreith", "Hroth", "Hroll", "Hross", "Hug", "Hund", "Hun", "Hus", "Hvat", "Hvit", "Igul", "Ing", "Jarg", "Jarn", "Jarp", "Jat", "Jofur", "Jor", "Ketil", "Kol", "Korp", "Kvig", "Kylf", "Leik", "Lith", "Likn", "Ljot", "Ljuf", "Mal", "Mann", "Magn", "Mel", "Mist", "Moth", "Mun", "Mund", "Natt", "Nef", "Othal", "Odd", "Ofrath", "Naemr", "Orm", "Orn", "Os", "Ott", "Rath", "Rafn", "Ragn", "Rand", "Rann", "Rask", "Rauth", "Rink", "Rik", "Roth", "Rog", "Rogn", "Run", "Sae", "Sanf", "Sig", "Sin", "Skjald", "Skjold", "Snae", "Sol", "Sand", "Stein", "Still", "Stoth", "Styn", "Sunn", "Svart", "Svein", "Tas", "Tith", "Trygg", "Tyr", "Ulf", "Unn", "Val", "Vald", "Varg", "Vethr", "Vetr", "Vith", "Vithr", "Vig", "Thial", "Thor"];
//middle- single vowel (optional consonant, vowel)
var norseEnd = ["bjorn", "djarfr", "terfr", "brandr", "maerki", "raor", "rikr", "steinn", "valdr", "ldr", "gisl", "fastr", "gautr", "guti", "geirr", "mundr", "vior", "boor", "baud", "ulfr", "leifr", "rinn", "ketill", "kaell", "lakr", "ljotr", "varor", "vinr", "moor", "rekr", "ver", "svarr", "vettr", "finnr", "grimr", "hallr", "hvatr", "niutr", "ketill", "laugr", "ddr", "froor", "lfr", "bjofr", "frior", "fari", "si", "sveinn", "thorr", "haror", "bildr", "hofoi", "laugr", "kari", "kkr", "freor", "fuss", "kollr", "lauss", "beinn", "styrr", "thegn", "fastr", "marr", "maor", "gestr", "garor", "ki", "thormr", "thorn", "ver", "thorir", "konr", "beinn", "vardr", "efni", "kuldr", "skyldr", "karld", "karr", "hofoi", "jaldr", "dagr", "thjofr", "fari", "karr", "dottr", "barthr", "thialfr", "frothr", "harthr", "hvatr", "athal", "vithr", "dagr", "fingr", "lithi", "hugsi"];

//declare arrays: array of letter numbers, then an array for custom input
var lettArray = [];
var userInput = [];
var inputCounter = 0;
//var positions = [];
//Push the desired letter number to lettArray, then if 6, dumps input array into userInput 2d array
function addLett(type) {
	lettArray.push(type);
	console.log(lettArray);
	if (lettArray[inputCounter] === 6) {
		var input = document.getElementById("userSylInput").value;
		userInput.push(input.split(', ')); 
		console.log(userInput[inputCounter]);
	}
	inputCounter++;
	
}
//Return a descriptor given a letter number
function dispLett(arrayval) {
	switch (arrayval) {
		case 1:
			return "V";
			break;
		case 2:
			return "VC";
			break;
		case 3:
			return "C";
			break;
		case 4:
			return "CC(b)";
			break;
		case 5:
			return "CC(m/f)";
			break;
		case 6:
			return "Custom";
			break;
		case "ns":
			return "Norse 1"
			break;
		case "ne":
			return "Norse 2"
			break;
		case "cs":
			return "Celtic 1"
			break;
		case "ce":
			return "Celtic 2"
			break;
		case "rs":
			return "Roman 1"
			break;
		case "re":
			return "Roman 2"
			break;
		case "gs":
			return "Greek 1"
			break;
		case "ge":
			return "Greek 2"
			break;
		default:
			console.log("Something broke!");
			break;
	}
}
//Run addLett on the user input, then print lettArray descriptors onto the page
function printAddLett(type1) {
	/*if (type1 === 6) {
		positions.push(inputCounter);
	}*/
	addLett(type1);
	var txt = "";
	for (i=0;i<lettArray.length;i++) {
		if (i === 0) {
			txt = txt + dispLett(lettArray[0]);
		} else {
			txt = txt + " + " + dispLett(lettArray[i]);
		}
	}
	document.getElementById("displayinput").innerHTML=txt;
}
//Make a preset-based name
function presetSet() {
	clearNames();
	var kind = document.getElementById("presets").value;
	switch (kind) {
		case "def":
			break;
		case "greek":
			printAddLett("gs");
			printAddLett(2);
			printAddLett("ge");
			break;
		case "celtic":
			printAddLett("cs");
			printAddLett(1);
			printAddLett("ce");
			break;
		case "roman":
			printAddLett("rs");
			printAddLett(1);
			printAddLett(3);
			printAddLett("re");
			break;
		case "norse":
			printAddLett("ns");
			printAddLett(1);
			printAddLett("ne");
			break;
	}
	printAddLett(syl1);
	printAddLett(syl1);
	printAddLett(syl1);
}
//clear name input selection
function clearNames() {
	inputCounter = 0;
	inputCounter2 = 0;
	lettArray = [];
	userInput = [];
	document.getElementById("displayinput").innerHTML="";
	document.getElementById("nameresults").innerHTML="";
	document.getElementById("userSylInput").value="";
}
//Generate a name given lettArray
function getNames(inputArray){
	var inputCounter2 = 0;
    var name = "";
    var charSource = [];
    var max = 0;

    var SV = ["a", "e", "i", "o", "u"]; //4

    var VP = ["a", "e", "i", "o", "u", "ae", "ai", "au", "ay", "ea", "ee", "ei", "eu", "ey", "ia","ie", "oe"/*, "ou", "ui"*/]; //18

    var SC = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v"/*, "w", "x", "y", "z"*/]; //19

    var BC = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "y", "z", "bl", "br", "ch", "chr", "cl", "cr", "dr", "ll", "ph", "qu", "rh", "sch", "sh", "sl", "sm","sn", "st", "str", "sw", "th", "wh", "zh"]; //41

    var MFC = [/*"b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w","x", "y", "z", */"ch", "ck", "gh", "lt", "ld", "ll", "nt", "nd", "nn", "ph", "rd", "rr", "rt", "sh","st", "ss", "th"]; //35

    //given array length, with array composed of numbers 1-5

    for(var n=0;n<inputArray.length;n++){

        switch (inputArray[n]) {
            case 1:
                charSource = SV;
                break;
            case 2:
                charSource = VP;
                break;
            case 3:
                charSource = SC;
                break;
            case 4:
                charSource = BC;
                break;
            case 5:
                charSource = MFC;
                break;
			case 6:
				var test = inputCounter2;
				console.log(test);
				console.log(userInput[test]);
				charSource = userInput[test];
				max = (userInput[test].length - 1);
				inputCounter2++;
				break;
			case "ns":
                charSource = norseBegin;
				break;
			case "ne":
                charSource = norseEnd;
				break;
			case "cs":
                charSource = celticBegin;
				break;
			case "ce":
                charSource = celticEnd;
				break;
			case "rs":
                charSource = romanBegin;
				break;
			case "re":
                charSource = romanEnd;
				break;
			case "gs":
                charSource = greekBegin;
				break;
			case "ge":
                charSource = greekEnd;
				break;
        }    
        
        name = name + charSource[Math.floor(Math.random()*((charSource.length - 1)+1))];    

    } 
    name = name.charAt(0).toUpperCase() + name.slice(1,name.length);
    return name;

}
//Print results in an x by x table
function printNames(input,x,y){
	var txt = "";
	for (i=0;i<x;i++) {
	txt = txt + "<tr>"
		for (j=0;j<y;j++) {
			txt = txt + "<td class=\"printnames\">" + getNames(input) + "</td>"
		}
	txt = txt + "</tr>"
	}
	document.getElementById("nameresults").innerHTML=txt;
}
//makes generated table size different based on device - 6x6 comp 2x10 mobile
function printNamesSized (input) {
	if (isMobile.iOS()) {
		printNames(input, 10, 2)
	} else {
		printNames(input, 6, 6)
	}
}

//Dungeon Generator
var dungArray = [];
function makeDung() {
	var x = document.getElementById("dinputx").value;
	var y = document.getElementById("dinputy").value;
	for (i=0;i<y;i++) {
		var temp = [];
		for (j=0;j<x;j++) {
			if (j == 0 && i == 0) {
				temp.push("ul");
			} else if (j == 0 && i == (y-1)) {
				temp.push("bl");
			} else if (j == (x-1) && i == 0) {
				temp.push("ur");
			} else if (j == (x-1) && i == (y-1)) {
				temp.push("br");
			} else if (i == 0) {
				temp.push("um");
			} else if (j == 0) {
				temp.push("ml")
			} else if (i == (y-1)) {
				temp.push("bm");
			} else if (j == (x-1)) {
				temp.push("mr");
			} else {
				temp.push("m");
			}
		}
		dungArray.push(temp);
	}
	if (x >= 3) {
	dungArray[0][diceRoll(1,(x-2),0)] = "ent";
	dungArray[y-1][diceRoll(1,(x-2),0)] = "exit";
	console.log(dungArray);
	}
}
function printDung() {
	makeDung();
	var x = document.getElementById("dinputx").value;
	var y = document.getElementById("dinputy").value;
	var txt = "<div id=\"dungeon\">";
	for (i=0;i<y;i++) {
		txt = txt + "<div class=\"dung\">"
		for (j=0;j<x;j++) {
			txt = txt + "<img src=\"resources/dungeon/" + dungArray[i][j] + "/" + diceRoll(1,2,0) + ".png\" />";
		}
		txt = txt + "</div>";
	}
	txt = txt + "</div>";
	document.getElementById("dungeon").innerHTML = txt;
	dungArray = [];
}

