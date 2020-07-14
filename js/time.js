let text = "evening";
let d = new Date();
if(d.getHours() < 12) {
	text = "morning";
} else if( hours < 16 ) {
	text = "afternoon";
}
document.getElementById('time').innerHTML=text;
document.getElementById('year').innerHTML=d.getFullYear();