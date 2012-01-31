$(document).ready( function() {
	
	$("#enablejs").html(""+
"<div id=\"dump\"></div>"+
"		<span id=\"bla\">$ </span><input type=\"text\" id=\"input\">");

	$("#input").focus();
	
	$(document).click( function() {
		$("#input").focus();
	});
var commandHistory = [];
var upTimes = 0;

var help = ""+
"Welcome to the WASH shell<br>"+
"type \"commands\" to see a list of available commands."

var commands = "<table style=\"border: 1px solid grey\"><tr><td>Commands:</td></tr>"+
"<tr><td>help</td><td>: well, duh</td></tr>"+
"<tr><td>commands</td><td>: show a list of available commands</td></tr>"+
"<tr><td>clear</td><td>: clear the terminal screen</td></tr></table>"
	
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
	});
	
	});
