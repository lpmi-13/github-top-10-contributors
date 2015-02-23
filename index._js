/*
console.log('hello ...');
setTimeout(_, 1000);
console.log('... world');
*/
var github = require("./github_facade.js");
var fs = require('fs');

// Process options from commandline arguments
var githubUser='', githubRepos='';
process.argv.forEach(function (val, index, array) {
  if(index > 1){ //ignore the first two

	if(val.indexOf('user:') > -1)
		githubUser = val.substring(5);
	else if(val.indexOf('repos:') > -1)
		githubRepos = val.substring(6);
  }
});

console.log('User: ' + githubUser+'\r\nRepos: '+githubRepos); 


var report = fs.createWriteStream('github-top-10-contributors-report.txt');

//Get top 10 contributors
var results = github.getTopContributorsByUserAndRepos(githubUser, githubRepos, 10, [_]);
console.log(results.length);
var user = results[0];
var repos = results[1];
var statusCode = results[2];
var json = results[3];

//Windows' newline: \r\n; nix's newline: \n
report.write('        GitHub top 10 Contributors\r\n\r\n'
			+ 'User: ' + user +'\r\n'
			+ 'Repository: ' + repos + '\r\n'
			+ 'Status: ' + (statusCode == 200 ? 'Succesful' : 'Error ' + statusCode) + '\r\n'
			+ 'Date/time: ' + new Date() + '\r\n'
			+ '\r\n'
			);
for(var i=0; i<json.length; i++){
	var contributor = json[i];
	report.write('#' + (i+1) + ' contributor: ' + contributor.login + '\r\n'
				 +'   contributions: ' + contributor.contributions + '\r\n'
				 + '\r\n'
				);
}
//console.log(json);
console.log(json.length + ' contributors');
report.end();


