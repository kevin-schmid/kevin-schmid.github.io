	var text = "day";
	var currentTime = new Date();
	var hours = currentTime.getHours();
	if( hours < 12) {
		text = "morning";
	} else if( hours < 16 ) {
		text = "afternoon";
	} else {
		text = "evening";
	}
	document.getElementById('time').innerHTML=text;