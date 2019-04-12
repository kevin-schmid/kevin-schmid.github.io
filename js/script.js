let dataSet = [];
let worker = new Worker('./js/worker.js');
worker.onmessage = event => {
	addData(event.data);
	redraw()
}

const about = () => {
	document.getElementById('about').style.display = 'block';
	document.getElementById('github').style.display = 'none';

	let text = "day";
	let hours = new Date().getHours();
	if( hours < 12) {
		text = "morning";
	} else if( hours < 16 ) {
		text = "afternoon";
	} else {
		text = "evening";
	}
	document.getElementById('time').innerHTML=text;
}

const github = () => {
	document.getElementById('about').style.display = 'none';
	document.getElementById('github').style.display = 'block';
}

about();
document.getElementsByClassName('about')[0].addEventListener('click', about, false);
document.getElementsByClassName('github')[0].addEventListener('click', github, false);

const addData = data => {
	let date = new Date(data.date);
	let currKey = (date.getFullYear()-2000) + '-' + (date.getMonth() + 1).toString().padStart(2, '0');
	let foundData = dataSet.find(entry => entry.key == currKey);
	if(foundData) {
		foundData.value = foundData.value + 1;
	} else {
		dataSet.push({
			key: currKey,
			value: 1
		});
	}
	dataSet.sort((a, b) => a.key.localeCompare( b.key ));
}

const redraw = () => {
	let c = document.getElementById("github_content");
	let ctx = c.getContext("2d");
	let maxX = c.width -20;
	let maxY = c.height -20;
	let x = 0;
	let y = 0;

	ctx.clearRect(0, 0, c.width, c.height);
	dataSet.forEach(data => {
		x = 0;
		ctx.fillText(data.key, x, y+10);
		x += 28;
		for(var j = 0; j < data.value; j++) {
			ctx.fillRect(x, y, 10, 10);
			x += 12;
		}
		y += 12;
	});
}