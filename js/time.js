updatePartOfDay = () => {
	let d = new Date();
	let text = "evening";
	if(d.getHours() < 12) {
		text = "morning";
	} else if(d.getHours() < 16 ) {
		text = "afternoon";
	}
	if(text !== document.getElementById('time').innerHTML) {
		document.getElementById('time').innerHTML = text;
	}
}

document.getElementById('year').innerHTML = new Date().getFullYear();
updatePartOfDay();
setInterval(updatePartOfDay, 60*1000);

window.matchMedia("print").addEventListener("change", (x) => {
	if(x.matches) {
		document.getElementById('time').innerHTML = "day";
	} else {
		updatePartOfDay();
	}
});

window.addEventListener('afterprint', updatePartOfDay);
window.addEventListener("beforeprint", (event) => {
	document.getElementById('time').innerHTML = "day";
});