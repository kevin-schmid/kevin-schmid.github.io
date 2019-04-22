if (!!window.SharedWorker) {
	let worker = new SharedWorker('./js/sharedworker.js');
	worker.port.onmessage = event => redraw(event.data.dataSet);
	worker.port.start();
	worker.port.postMessage('');
}

const redraw = (dataSet) => {
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