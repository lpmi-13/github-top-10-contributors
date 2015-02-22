var github = require("./github_facade");
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
github.getTopContributorsByUserAndRepos(githubUser, githubRepos, 10, function(user, repos, statusCode, json){
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
});


/*
//Get all contributors
github.getTopContributorsByUserAndRepos('sage','streamlinejs', null, function(statusCode, json){
	console.log(statusCode);
	console.log(json);
	console.log(json.length + ' contributors');
});
*/

github.getUserDetailByUserName('non-existing', function(statusCode, json){
	console.log(statusCode);
	console.log(json);
});

github.getUserDetailByUserName('calvin-m', function(statusCode, json){
	console.log(statusCode);
	console.log(json);
});
