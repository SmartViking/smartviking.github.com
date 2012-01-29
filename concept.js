$(document).ready( function() {
	
	$("#input").focus();
	
	$("#input").keyup( function(event) {

	if (event.keyCode == 13) {
		var x = $("#dump")
		switch(this.value)
		{
		case "clear":
			x.text("");
			break;
		case "":
			x.append("<span class=\"commands\">$</span><br>");
			break;
		case "halp": case "help":
			x.append("<span class=\"commands\">$"+this.value+"<br>HAYYY!</span><br>");
			break;
		default:
		x.append("<span class=\"commands\">$"+this.value+"<br>"+this.value+": command not found</span><br>");
		}
		this.value = "";
		window.location = "#input";
		this.focus();
	}
	
	});
	
	});
