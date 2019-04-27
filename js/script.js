let dataSet = [];
let blinkColor = 1;
let blinkColorAsc = true;

if (!!window.SharedWorker) {
	let worker = new SharedWorker('./js/worker.js');
	worker.port.onmessage = event => dataSet = event.data.dataSet;
	worker.port.start();
	worker.port.postMessage('');
}

const redraw = () => {
	let c = document.getElementById("github_content");
	let ctx = c.getContext("2d");
	let x = 0;
	let y = 5;
	const factor = 20;
	const padding = 2;
	c.height = dataSet.length * (factor+padding+y);
	
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.font = "20px 'Noto Serif', serif";
	ctx.fillStyle = '#444444';
	let blinkDrawn = false;
	dataSet.forEach(data => {
		x = 0;
		ctx.fillText(data.key, x, y+factor-padding);
		x += 60;
		for(var j = 0; j < data.value; j++) {
			if(c.width < (x + factor + padding + 20)) {
				ctx.fillText('...', x, y+factor-padding);
				break;
			}
			ctx.fillRect(x, y, factor, factor);
			x += factor+padding;
		}
		if(!blinkDrawn) {
			let hex = ('0' + blinkColor.toString(16)).substr(-2);
			ctx.strokeStyle = '#'+hex+hex+hex;
			ctx.rect(x, y, factor, factor);
			ctx.stroke();
			blinkDrawn = true;
		}
		y += factor+padding;
	});
	if(blinkColor > 254 || blinkColor < 1) {
		blinkColorAsc = !blinkColorAsc;
	}
	if(blinkColorAsc) {
		blinkColor = blinkColor + 1;
	} else {
		blinkColor = blinkColor - 1;
	}
	window.requestAnimationFrame(redraw);
}
redraw();