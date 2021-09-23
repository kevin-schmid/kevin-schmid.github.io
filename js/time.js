function updateTime(x) {
	let d = new Date();
	if(x.matches) {
		document.getElementById('time').innerHTML = "day";
	} else {
		let text = "evening";
		if(d.getHours() < 12) {
			text = "morning";
		} else if(d.getHours() < 16 ) {
			text = "afternoon";
		}
		document.getElementById('time').innerHTML=text;
	}
	document.getElementById('year').innerHTML=d.getFullYear();
}

var x = window.matchMedia("print")
updateTime(x)
x.addEventListener("change", updateTime)