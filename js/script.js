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
about();

function about() {
	document.getElementById('about').style.display = 'block';
	document.getElementById('github').style.display = 'none';
}

var graph_data = {};
function github() {
	document.getElementById('about').style.display = 'none';
	document.getElementById('github').style.display = 'block';
	graph_data = {};
	$.get('https://api.github.com/users/CodingGentleman/repos', function(data, status){
		data.forEach(element => handleRepo(element.name));
	});

	/*
	$.get('https://api.github.com/users/CodingGentleman/events', function(data, status){
		var graph_data = {};
		data.filter(element => element.type == 'PushEvent').forEach(element => {
			var date = new Date(element.created_at);
			var key = (date.getFullYear()-2000) + '-' + (date.getMonth() + 1);
			var value = (graph_data.key || 0) + element.payload.commits.length;
			graph_data[key] = value;
			draw(graph_data);
		});
	}); */
}

function handleRepo(name) {
	$.get('https://api.github.com/repos/CodingGentleman/'+name+'/commits?author=CodingGentleman', function(data, status){
		data.forEach(commit => handleCommit(commit));
	});
}

function handleCommit(commits) {
	var date = new Date(commits.commit.author.date);
	var key = (date.getFullYear()-2000) + '-' + (date.getMonth() + 1);
	var value = (graph_data[key] || 0) + 1;
	graph_data[key] = value;
	draw(graph_data);
}

var maximumYValue = 0;
var maximumYValue = 10;
function draw(data) {
	var c = document.getElementById("github_content");
	var ctx = c.getContext("2d");
	var maxX = c.width -20;
	var maxY = c.height -20;
	var minX = 20;
	var minY = 20;
	/*
	ctx.beginPath();

	//Horizontal Axis
	ctx.lineWidth=1.0;
	ctx.lineCap = 'round';
	ctx.moveTo(minX,maxY);
	ctx.lineTo(maxX,maxY);

	//Vertical Axis
	ctx.moveTo(minX,maxY);
	ctx.lineTo(minX,minY);

	ctx.stroke();

	ctx.lineWidth = 0.5;
	var noOfGrids = 5;
	var vGridDiff = (maxY - minY)/noOfGrids;
	ctx.font="12px Helvetica";
	for (var i =1; i<noOfGrids;i++) {
		ctx.moveTo(minX,maxY-i*vGridDiff);
		ctx.lineTo(maxX,maxY-i*vGridDiff);
		ctx.fillText((i*maximumYValue/noOfGrids),20,maxY-i*vGridDiff);
	}
	ctx.stroke();

	var padding = 20;
	var maxHeight = Math.round((maxY - minY)*1.0);
	ctx.fillStyle = "rgba(0, 0, 0, 0.65)"
	ctx.beginPath();
	*/
	
	var y = minY;
	for (const [i, [key, value]] of Object.entries(Object.entries(data))) {
		console.log(`${i}: ${key} = ${value}`);
		var x = minX;
		for(var j = 0; j < value; j++) {
			console.log(j);
			ctx.fillRect(x, y, 10, 10);
			x += 12;
		}
		y += 12;
		/*
		x = 20+minX+i*padding+i*40;
		y = maxY-((parseInt(value)/maximumYValue)*maxHeight);
		w = 30;
		h = parseInt(value)/maximumYValue*maxHeight-1;
		console.log('x:' + x + ' y:' +y + ' w:' +w+ ' h:'+h);
		ctx.rect(x, y, w, h);	*/
	}
}