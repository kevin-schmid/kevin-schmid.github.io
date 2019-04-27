let dataSet = [];
let commitCount = 0;
let port;

onconnect = function(e) {
    port = e.ports[0];
    if(commitCount < 1) {
        port.onmessage = e => fetchData();
    }
}

const fetchData = () => fetch('https://api.github.com/users/CodingGentleman/repos')
    .then(status)
    .then(json)
    .then(data => data.forEach(repo => handleRepo(repo.name)))
    .catch(error);

const handleRepo = name => {
    fetch('https://api.github.com/repos/CodingGentleman/'+name+'/commits?author=CodingGentleman')
    .then(status)
    .then(json)
    .then(data => data.forEach(commit => handleCommit(commit)))
    .catch(error);
}

const handleCommit = commits => {
    addData(commits.commit.author.date);
    commitCount++;
	port.postMessage({
        'commitCount': commitCount,
        'dataSet': dataSet
    });
}

const status = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.status + ': ' + response.statusText))
    }
}

const json = response => response.json();
const error = err => console.log('Fetch Error: ', err);

const addData = commitDate => {
	let date = new Date(commitDate);
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
	dataSet.sort((a, b) => b.key.localeCompare( a.key ));
}