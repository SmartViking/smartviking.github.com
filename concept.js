$(document).ready( function() {
	
	$("#input").focus();
	
	$(document).click( function() {
		$("#input").focus();
	});
	
	$("#input").keyup( function(event) {

	if (event.keyCode == 13) {
		var x = $("#dump")
		var t = this.value
		var findReplace = [[/&/g, "&amp;"], [/</g, "&lt;"], [/>/g, "&gt;"], [/"/g, "&quot;"]]
		for(var item in findReplace)
			t = t.replace(findReplace[item][0], findReplace[item][1]);

		switch(t)
		{
		case "clear":
			x.text("");
			break;
		case "":
			x.append("<span class=\"commands\">$</span><br>");
			break;
		case "halp": case "help":
			x.append("<span class=\"commands\">$"+t+"<br>HAYYY!</span><br>");
			break;
		default:
		x.append("<span class=\"commands\">$"+t+"<br>"+t+": command not found</span><br>");
		}
		this.value = "";
		window.location = "#input";
		this.focus();
	}
	
	});
	
	});
