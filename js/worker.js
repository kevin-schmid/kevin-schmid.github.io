const status = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.status + ': ' + response.statusText))
    }
}

const json = response => response.json();
const error = err => console.log('Fetch Error: ', err);

fetch('https://api.github.com/users/CodingGentleman/repos')
    .then(status)
    .then(json)
    .then(function(data) {
        data.forEach(repo => handleRepo(repo.name));
    })
    .catch(error);

function handleRepo(name) {
    fetch('https://api.github.com/repos/CodingGentleman/'+name+'/commits?author=CodingGentleman')
    .then(status)
    .then(json)
    .then(function(data){
        data.forEach(commit => handleCommit(commit));
    })
    .catch(error);
}

function handleCommit(commits) {
	postMessage({
        'sha': commits.sha,
        'date': commits.commit.author.date
    });
}