$(document).ready( function() {

if (typeof String.prototype.startOf != 'function') {
  String.prototype.startOf = function (str){
    if (this.length == 0)
    {
    return true;
    }
    else
    {
    return str.indexOf(this) == 0;
    }
  };
}

	$("#enablejs").html(""+
"<div id=\"dump\"></div>"+
"		<span id=\"bla\">$ </span><input type=\"text\" id=\"input\" >");

	$("#input").focus();
	
	$(document).click( function() {
		$("#input").focus();
	});

var commandHistory = [];
var upTimes = 0;

var help = ""+
"Welcome to the WASH shell<br>"+
"type \"commands\" to see a list of available commands.";

var commands = "<table style=\"border: 1px solid grey\"><tr><td>Commands:</td></tr>"+
"<tr><td>help</td><td>: well, duh</td></tr>"+
"<tr><td>commands</td><td>: show a list of available commands</td></tr>"+
"<tr><td>clear</td><td>: clear the terminal screen</td></tr></table";

var commandsArray = ["help","commands","clear"];
var matchingCommands = [];
tabWarningGiven = false;
	
	$("#input").keyup( function(event) {
	if (event.keyCode == 13) {
		upTimes = 0;
		var x = $("#dump");
		var t = this.value;
		var findReplace = [[/&/g, "&amp;"], [/</g, "&lt;"], [/>/g, "&gt;"], [/"/g, "&quot;"]];
		for(var item in findReplace)
			t = t.replace(findReplace[item][0], findReplace[item][1]);

		switch(t)
		{
		case "clear":
			x.text("");
			break;
		case "":
			x.append("<span class=\"commands\">$ </span><br>");
			break;
		case "halp": case "help":
			x.append("<span class=\"commands\">$ "+t+"<br>"+help+"</span><br>");
			break;
		case "commands":
			x.append("<span class=\"commands\">$ "+t+"<br>"+commands+"</span>");
			break;
		default:
		x.append("<span class=\"commands\">$ "+t+"<br>"+t+": <span style=\"color:darkred;\">command not found</span></span><br>");
		}
		if (commandHistory[commandHistory.length-1] != this.value || commandHistory.length == 0) {
			commandHistory.push(this.value);
		}
		this.value = "";
		window.location = "#input";
		this.focus();
	}
	else if (event.keyCode == 38) {
		upTimes++;
		if (commandHistory.length-upTimes >= 0) {
		this.value = commandHistory[commandHistory.length-upTimes];
		}
		else {upTimes--;}
	}
	else if (event.keyCode == 40) {
		upTimes--;
		if (upTimes >= 0) {
			if (!upTimes == 0) {
			this.value = commandHistory[commandHistory.length-upTimes];
			}
			else {this.value = "";}
		}
		else {upTimes++;}
	}
	else if ((event.keyCode == 9) || (event.keyCode == 16)) {
		event.preventDefault();
		matchingCommands = [];
		
		for (i in commandsArray) {
			if (this.value.startOf(commandsArray[i]) == true) {
				matchingCommands.push(commandsArray[i]);
				}
		}
		
		if (matchingCommands.length == 1) {
			this.value = matchingCommands[0];
		}
		else if (!matchingCommands.length == 0) {
				
			if (matchingCommands.length % 2 != 0) {
				matchingCommands.push("")
			}$ 
		
			var index = 0;
			var table = "";
			
			if ((!tabWarningGiven) && (event.keyCode == 9)) {
				tabWarningGiven = true;
				table += "<span style=\"color:darkred;\"><br>Tips: if the tab key is irritating (because it keeps unfocusing), use SHIFT instead.</span>"
			}
			
			table += '<table width="250" border="0">';
			for (j=1;j<= (matchingCommands.length/2) ;j++) {
				table += '<tr>';
				for (i=1;i<=2;i++) {
					table += '<td class="commands">' + matchingCommands[index]  + '</td>';
					index++;
				}
				table += '</tr>';
			}
			table += '</table>';
			
			$("#dump").append("<span class=\"commands\">$ "+this.value+"</span>"+table)
			window.location = "#input";
			this.focus();
		}
	}
	});
	
	});
